using LakesideAPI.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace LakesideAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class statsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public statsController(AppDbContext context)
        {
            _context = context;
        }
        #region OKe 

        //Thông tin khách hàng đặt trong ngày   
        [HttpGet("info-by-customer-day/{fulldateString}")]
        public IActionResult TinhTongTienTheoKhachHangNgayX(string fulldateString)
        {
            DateTime ngayX = DateTime.ParseExact(fulldateString, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime ngayXNextDay = ngayX.AddDays(1);

            var hoaDons = _context.HoaDon
                .Where(h => h.DatPhong.NgayDat >= ngayX && h.DatPhong.NgayDat < ngayXNextDay)
                .GroupBy(h => new { h.DatPhong.TenKhachHang, h.DatPhong.SoDienThoai })
                .Select(g => new
                {
                    TenKhachHang = g.Key.TenKhachHang,
                    SoDienThoai = g.Key.SoDienThoai,
                    SoLanDat = g.Count(),
                    DoanhThu = g.Sum(h => h.TongTien)
                })
                .OrderByDescending(h => h.SoLanDat)
                .ToList();
            return Ok(hoaDons);
        }

        //Trả về tổng doanh thu trong tháng
        [HttpGet("revenue-in-month/{dateString}")]
        public IActionResult TinhTongTienTrongThang(string dateString)
        {
            DateTime fromDate = DateTime.ParseExact(dateString, "yyyy-MM", CultureInfo.InvariantCulture);
            DateTime toDate = fromDate.AddMonths(1).AddDays(-1);

            var hoaDons = _context.HoaDon
                .Where(h => h.NgayDen >= fromDate && h.NgayDi <= toDate)
                .ToList();

            float tongTien = hoaDons.Sum(h => h.TongTien);

            return Ok(tongTien);
        }

        //Trả về số lần đặt và doanh thu của từng phòng 
        [HttpGet("revenue-by-room/{dateString}")]
        public IActionResult TinhDoanhThuTheoPhongTrongThang(string dateString)
        {
            DateTime fromDate = DateTime.ParseExact(dateString, "yyyy-MM", CultureInfo.InvariantCulture);
            DateTime toDate = fromDate.AddMonths(1).AddDays(-1);

            var hoaDons = _context.HoaDon
                .Where(h => h.NgayDen >= fromDate && h.NgayDi <= toDate)
                .GroupBy(h => h.TenPhong)
                .Select(g => new
                {
                    Phong = g.Key,
                    SoLanDat = g.Count(),
                    DoanhThu = g.Sum(h => h.TongTien)
                })
                .OrderByDescending(h => h.SoLanDat) // Sắp xếp theo số lần đặt giảm dần
                .ToList();

            return Ok(hoaDons);
        }

        //Trả về mã phòng và số lượng đặt tương ứng trong tháng 
        [HttpGet("quantity-ordered-in-a-month/{dateString}")]
        public IActionResult ThongKePhongItDatThang(string dateString)
        {
            DateTime fromDate = DateTime.ParseExact(dateString, "yyyy-MM", CultureInfo.InvariantCulture);

            var danhSachPhongItDat = _context.DatPhong
                .Where(hd => hd.NgayNhan.Month == fromDate.Month && hd.NgayNhan.Year == fromDate.Year)
                .GroupBy(hd => hd.MaPhong)
                .OrderBy(group => group.Count())
                .Take(10)
                .Select(group => new
                {
                    MaPhong = group.Key,
                    SoLuongDat = group.Count()
                })
                .ToList();

            return Ok(danhSachPhongItDat);
        }

        //API cho chartJS   
        [HttpGet("revenue-by-month")]
        public IActionResult GetRevenueByMonth()
        {
            var currentDate = DateTime.Now;
            var labels = new List<string>();
            var values = new List<float>();

            for (int i = 1; i <= 12; i++)
            {
                var startDate = new DateTime(currentDate.Year, i, 1);
                var endDate = startDate.AddMonths(1).AddDays(-1);

                var revenue = _context.HoaDon
                    .Where(hd => hd.NgayDen >= startDate && hd.NgayDi <= endDate)
                    .Sum(hd => hd.TongTien);

                labels.Add($"Tháng {i}");
                values.Add(revenue);
            }

            var data = new { labels, values };

            return Ok(data);
        }

        #endregion

        public class BookingByCustomerResponse
        {
            public string TenKhachHang { get; set; }
            public string SoDienThoai { get; set; }
            public int SoLanDat { get; set; }
            public List<BookingInfo> DanhSachDatPhong { get; set; }
            public float DoanhThu { get; set; }
        }

        public class BookingInfo
        {
            public DateTime NgayDat { get; set; }
            public DateTime NgayNhan { get; set; }
            public DateTime NgayTra { get; set; }
            public string TrangThai { get; set; }
            public int MaPhong { get; set; }
        }

        //Thông tin khách hàng đặt phòng trong tháng    
        [HttpGet("bookings-by-customer-in-month/{dateString}")]
        public IActionResult TinhTongTienTrongThangBoiKhachHangg(string dateString)
        {
            DateTime fromDate = DateTime.ParseExact(dateString, "yyyy-MM", CultureInfo.InvariantCulture);
            DateTime toDate = fromDate.AddMonths(1).AddDays(-1);
            var hoaDons = _context.HoaDon
                .Where(h => h.NgayDen >= fromDate && h.NgayDi <= toDate)
                .GroupBy(h => new { h.DatPhong.TenKhachHang, h.DatPhong.SoDienThoai })
                .Select(g => new BookingByCustomerResponse
                {
                    TenKhachHang = g.Key.TenKhachHang,
                    SoDienThoai = g.Key.SoDienThoai,
                    SoLanDat = g.Count(),
                    DanhSachDatPhong = g.Select(h => new BookingInfo
                    {
                        NgayDat = h.DatPhong.NgayDat,
                        NgayNhan = h.DatPhong.NgayNhan,
                        NgayTra = h.DatPhong.NgayTra,
                        TrangThai = h.DatPhong.TrangThai,
                        MaPhong = h.DatPhong.MaPhong
                    }).ToList(),
                    DoanhThu = g.Sum(h => h.TongTien) // Tính toán trường doanh thu
                })
                .OrderByDescending(h => h.SoLanDat) // Sắp xếp theo số lần đặt giảm dần
                .ToList();

            return Ok(hoaDons);
        }

    }
}
