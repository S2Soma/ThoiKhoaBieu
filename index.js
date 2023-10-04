//Tạo nội dung cho các ô lựa chọn
function set_thu()
{
    var s = document.getElementById("chon_thu");
    var r = "";
    for(var i = 1; i < 7; i++)
    {
        r += `<option value="${i+1}">thứ ${i+1}</option>`
    }
    r += `<option name="" value="8">Chủ nhật</option>`
    s.innerHTML = r;
}
function set_nhom()
{
    var s = document.getElementById("chon_nhom");
    var r = "";
    for(var i = 1; i <= 20; i++)
    {
        r += `<option value="${i}">${i}</option>`
    }
    s.innerHTML = r;
}
function set_tiet_bd()
{
    var s = document.getElementById("chon_tiet_bd");
    var r = "";
    for(var i = 1; i <= 10; i++)
    {
        r += `<option value="${i}">tiết ${i}</option>`
    }
    s.innerHTML = r;
}
function set_so_tiet()
{
    var s = document.getElementById("chon_so_tiet");
    var r = "";
    for(var i = 1; i <= 5; i++)
    {
        r += `<option value="${i}">${i}</option>`
    }
    s.innerHTML = r;
}

var tkb = [];
var data_mon = []
var dem_mon = 0;
//tạo màu để tô
var arr_color = [];
function khoi_tao_mau()
{
    arr_color[0] = "aqua";
    arr_color[1] = "teal";
    arr_color[2] = "#99FF66";
    arr_color[3] = "#FFFF33";
    arr_color[4] = "#FFCC99";
    arr_color[5] = "#FFCCCC";
    arr_color[6] = "#CC99FF";
    arr_color[7] = "#FF9966";
    arr_color[8] = "#FF6600";
    arr_color[9] = "#FF6666";
    arr_color[10] = "#006666";
    arr_color[11] = "#996666";
    arr_color[12] = "#00FF00";
}
function get_mau()
{
    var mau;
    for(var i = 0; i < 13; i++)
    {
        if(arr_color[i] != "")
        {
            mau  = arr_color[i];
            arr_color[i] = "";
            return mau;
        }
    }
    return "";
}
//khởi tạo môn
function mon(ten, nhom, thu, tiet_bd, so_tiet, mau) {
    this.ten = ten;
    this.nhom = nhom;
    this.thu = thu;
    this.tiet_bd = tiet_bd;
    this.so_tiet = so_tiet;
    this.mau = mau;
}
//khởi tạo mảng chuỗi thời khóa biểu
function khoi_tao()
{
    for(var i = 0; i < 7; i++)
    {
        tkb[i] = "";
    }
}
//kiểm tra môn có tồn tại hay không
function check_data(mon_hoc)
{
    for(var i = 0; i < dem_mon; i++)
    {
        if(mon_hoc.ten == data_mon[i].ten) return i;
    }
    return -1;
}
//các hàm để tạo thời khóa biểu
function check_time(tiet, thu)
{
    if(tkb[thu].includes(tiet))
    {
        alert("Tiết đã có môn học!");
        return false;
    } 
    return true;
}
//lưu các môn được thêm vào
function luu_mon()
{
    var ten = document.getElementById("nhap_ten_mon_hoc").value;
    if(ten == "") 
    {
        alert("Chưa nhập tên môn học!");
        return;
    }
    var thu = document.getElementById("chon_thu").value;
    var tiet_bd = document.getElementById("chon_tiet_bd").value;
    var so_tiet = document.getElementById("chon_so_tiet").value;
    var nhom = document.getElementById("chon_nhom").value;
    var n = Number(so_tiet) + Number(tiet_bd) - 1;
    if(n > 10) 
    {
        alert("Lỗi số tiết vượt quá 10 tiết 1 ngày!");
        return;
    }
    for(var i = Number(tiet_bd); i <= n; i++)
    {
        var check = check_time(i, Number(thu) - 2);
        if(i == 10) check = check_time("0", Number(thu) - 2);
        if(!check) return;
    }
    var mau = get_mau();
    var mon_hoc = new mon(ten , nhom, thu, tiet_bd, so_tiet, mau);
    var vt_mon = check_data(mon_hoc);
    if(vt_mon != -1) mau = data_mon[vt_mon].mau;
    to_mau(ten, nhom, Number(thu) - 2, Number(tiet_bd),Number(so_tiet), mau);
    data_mon[dem_mon++] = mon_hoc;
}
//xử lý chuỗi thời khóa biểu
function xu_ly()
{
    var s = document.getElementById("chuoi").value;
    if(s == "") 
    {
        alert("Chưa nhập thời khóa biểu");
        return;
    }
    s = s.replace(/\s+/g,' ').trim();
    var vt_bd = 0, vt_kt = 0, ma_mon = "", ten_mon = "", nhom = "";
    while(s != "")
    {
        ma_mon = s.match(/^\d{6}/);
        vt_bd = s.search(ma_mon);
        vt_kt = s.search('DSSV');
        var r = s.slice(vt_bd + 7, vt_kt);
        var i = 0;
        for(; i < r.length; i++)
        {
            if(check_char(r.charAt(i)) == 1) ten_mon += r.charAt(i);
            else break;
            
        }
        console.log(ten_mon)
        var e = check_ten(s.slice(s.search(ten_mon) + ten_mon.length, s.search(ten_mon) + ten_mon.length + 2));
        if (e != "") 
        {
            ten_mon += e;
            i += 2;
        }
        for(; i < r.length; i++)
        {
            if(check_char(r.charAt(i)) == -1)
            {
                nhom += r.charAt(i);
                if(r.charAt((i + 1)) == ' ') break;
            }            
        }
        ten_mon = ten_mon.replace(/\s+/g,' ').trim();
        check_ngay_tiet(r.slice(i), ten_mon);
        s = cat_chuoi(s.slice(s.search('DSSV')));
        ten_mon = "";
        ma_mon = "";
        nhom = "";
    }
    
}
//kiểm tra tên môn có kèm số hay không
function check_ten(s)
{
    var r = "123456789";
    console.log(s)
    if(r.includes(s.charAt(0)) && s.charAt(1) == ' ')
    {
        return s.charAt(0);
    }
    return "";
}
//cắt theo cụm DSSV
function cat_chuoi(s)
{
    var vt_kt = 0;
    while((vt_kt = s.search('DSSV')) == 0)
    {
        s = s.slice(vt_kt + 5);
    }
    return s;
}
//xử lý chuỗi và tô màu
function check_ngay_tiet(s, ten)
{
    var r = [], Sthu = "Hai Ba Tư Năm Sáu Bảy Chủ Nhật";
    var j = 0;
    var mau = get_mau();
    if(mau == "") return;
    r[0] = "";
    for(var i = 0; i < s.length; i++)
    {

        if(s.charAt(i) != ' ')
        {
            r[j] += s.charAt(i);
            if(s.charAt((i + 1)) == ' ')
            {
                j++;
                r[j] = "";
            } 
        }  
    }
    if(check_char(r[2]) == -1)
    {
        var vt0 = Sthu.search(r[3]);
        var vt1 = Sthu.search(r[4]);
        var vt2 = Sthu.search(r[5]);
        if(vt0 != -1)
        {
            if(vt1 != -1)
            {
                to_mau(ten, r[10], check_thu(vt1), Number(r[6]), Number(r[8]), mau);
                to_mau(ten, r[9], check_thu(vt0), Number(r[5]), Number(r[7]), mau);
            }
            else to_mau(ten, r[6], check_thu(vt0), Number(r[4]), Number(r[5]), mau);
        }
        else
        {
            if(vt2 != -1)
            {
                to_mau(ten, r[10], check_thu(vt1), Number(r[6]), Number(r[8]), mau);
                to_mau(ten, r[11], check_thu(vt2), Number(r[7]), Number(r[9]), mau); 
            }
            else to_mau(ten, r[7], check_thu(vt1), Number(r[5]), Number(r[6]), mau);
        }
        return;
    }
    var vt0 = Sthu.search(r[4]);
    var vt1 = Sthu.search(r[5]);
    var vt2 = Sthu.search(r[6]);
    if(vt0 != -1)
    {
        if(vt1 != -1)
        {
            to_mau(ten, r[11], check_thu(vt1), Number(r[7]), Number(r[9]), mau);
            to_mau(ten, r[10], check_thu(vt0), Number(r[6]), Number(r[8]), mau);
        }
        else to_mau(ten, r[7], check_thu(vt0), Number(r[5]), Number(r[6]), mau);
    }
    else
    {
        if(vt2 != -1)
        {
            to_mau(ten, r[11], check_thu(vt1), Number(r[7]), Number(r[9]), mau);
            to_mau(ten, r[12], check_thu(vt2), Number(r[8]), Number(r[10]), mau); 
        }
        else to_mau(ten, r[8], check_thu(vt1), Number(r[6]), Number(r[7]), mau);
    }
    

}
//kiểm tra thứ 
function check_thu(vt)
{
    var thu = -1;
    switch (vt)
    {
        case 0: 
            thu = 0;
            break;
        case 4: 
            thu = 1;
            break;
        case 7:
            thu = 2;
            break;
        case 10: 
            thu = 3;
            break;
        case 14: 
            thu = 4;
            break;
        case 18: 
            thu = 5;
            break;
        case 22: 
            thu = 6;
            break;
    }
    return thu;
}
//tô màu và ghi thông tin
function to_mau(ten, phong, thu, tiet_bd, so_tiet, mau)
{
    var n = so_tiet + tiet_bd - 1;
    var n2 = (n + tiet_bd);
    for(var i = tiet_bd; i <= n; i++)
    {
        if(i == 10) tkb[thu] += 0;
        else tkb[thu] += i;
        s = document.getElementsByClassName("tiet" + i)[thu];
        if((so_tiet == 2 && i == tiet_bd)|| (so_tiet == 4 && i == tiet_bd + 1)) s.style.paddingTop = "16px"; 
        s.style.backgroundColor = mau;
        s.style.textAlign = 'center';
        if(n2%2 == 0 && i == n2/2) s.innerHTML =  `<h5>${ten}</h5>
        <h5>${phong}</h5>`;
        else if (n2%2 == 1 && i == n2/2 - 0.5) s.innerHTML = `<h5>${ten}</h5>
        <h5>${phong}</h5>`;
        else s.style.color = mau;
        if(i < n) s.style.borderBottom = "1px solid " + mau;
        if(i > tiet_bd) s.style.borderTop = "1px solid " + mau;
    }
}
//kiểm tra kí tự là số hay không
function check_char(c)
{
    switch(c)
    {
        case '0': return -1;
        case '1': return -1;
        case '2': return -1;
        case '3': return -1;
        case '4': return -1;
        case '5': return -1;
        case '6': return -1;
        case '7': return -1;
        case '8': return -1;
        case '9': return -1;
    }
    return 1;
}
//Hiệu ứng led
var arr_color2 = [];
function khoi_tao_mau_led()
{
    arr_color2[0] = "#33FFFF";
    arr_color2[1] = "#00FF99";
    arr_color2[2] = "#00FF33";
    arr_color2[3] = "#CCFF33";
    arr_color2[4] = "#FFFF33";
    arr_color2[5] = "#FFCC33";
    arr_color2[6] = "#FFCC00";
    arr_color2[7] = "#FFCC99";
    arr_color2[8] = "#FFCCCC";
    arr_color2[9] = "#FFCCFF";
    arr_color2[10] = "#FF66FF";
    arr_color2[11] = "#FF3399";
    arr_color2[12] = "#FF3333";
    arr_color2[13] = "#FF3300";
}
var i = 0;
var check = true;
setInterval(function(){
    var led = document.getElementsByClassName("cover")[0];
    var s;
    if(i == 13) check = false;
    if(i == 0) check = true;
    if(!check) s = "5px solid " + arr_color2[i--];
    else s = "5px solid " + arr_color2[i++];
    led.style.border = s;
}, 500) 
set_thu()
set_nhom()
khoi_tao()
khoi_tao_mau()
khoi_tao_mau_led()
set_tiet_bd()
set_so_tiet()