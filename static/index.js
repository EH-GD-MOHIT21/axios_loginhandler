unamestatus = "";
pass1status = "";
pass2status = "";
emailstatus = "";
phonestatus = "";
userstatus = "";
passstatus = "";


document.getElementById("login").addEventListener("click", function() {
    document.getElementById("main").style.display = "block";
    document.getElementById("submain").style.display = "none";
    document.getElementById("signup").style.pointerEvents = "all";
    document.getElementById("signup").style.background = "white";
    document.getElementById("login").style.pointerEvents = "none";
    document.getElementById("login").style.background = "gray";
    document.getElementById("container").style.marginTop = "13%";
    document.getElementById("container").style.marginBottom = "13%";
});

document.getElementById("signup").addEventListener("click", function() {
    document.getElementById("main").style.display = "none";
    document.getElementById("submain").style.display = "block";
    document.getElementById("login").style.pointerEvents = "all";
    document.getElementById("login").style.background = "white";
    document.getElementById("signup").style.pointerEvents = "none";
    document.getElementById("signup").style.background = "gray";
    document.getElementById("container").style.marginTop = "7%";
    document.getElementById("container").style.marginBottom = "7%";
});

document.getElementById("inputbox-signup").addEventListener("input", function() {
    document.getElementById("userlogshower-signup").style.display = "block";
    var uname = document.getElementById("inputbox-signup").value;
    axios.post('/register/user/verifyuname', {
            'uname': uname,
        })
        .then(res => {
            unamestatus = res['data']['message'];
            if (res['data']['message'] == 'success') {
                document.getElementById("inputbox-signup").style.border = "thick solid green"
                document.getElementById("userlogshower-signup").textContent = "/";
                document.getElementById("userlogshower-signup").style.color = "green"
                document.getElementById("userlogshower-signup").style.fontWeight = 600;
            } else {
                document.getElementById("inputbox-signup").style.border = "thick solid crimson"
                document.getElementById("userlogshower-signup").textContent = "X";
                document.getElementById("userlogshower-signup").style.color = "crimson"
                document.getElementById("userlogshower-signup").style.fontWeight = 600;
            }

        });
});

document.getElementById("passwordbox-signup").addEventListener("input", function() {
    document.getElementById("passlogshower-signup").style.display = "block";
    var password = document.getElementById("passwordbox-signup").value;
    axios.post('/register/user/verifypass', {
            'password': password,
        })
        .then(res => {
            pass1status = res['data']['message'];
            if (res['data']['message'] == 'success') {
                document.getElementById("passwordbox-signup").style.border = "thick solid green"
                document.getElementById("passlogshower-signup").textContent = "/";
                document.getElementById("passlogshower-signup").style.color = "green"
                document.getElementById("passlogshower-signup").style.fontWeight = 600;
            } else {
                document.getElementById("passwordbox-signup").style.border = "thick solid crimson"
                document.getElementById("passlogshower-signup").textContent = "X";
                document.getElementById("passlogshower-signup").style.color = "crimson"
                document.getElementById("passlogshower-signup").style.fontWeight = 600;
            }
        });
});

document.getElementById("passwordbox1").addEventListener("input", function() {
    document.getElementById("passlogshower1").style.display = "block";
    var cpass = document.getElementById("passwordbox1").value;
    var password = document.getElementById("passwordbox-signup").value;
    axios.post('/register/user/verifycpass', {
            'cpass': cpass,
            'pass': password,
        })
        .then(res => {
            pass2status = res['data']['message'];
            if (res['data']['message'] == 'success') {
                document.getElementById("passwordbox1").style.border = "thick solid green"
                document.getElementById("passlogshower1").textContent = "/";
                document.getElementById("passlogshower1").style.color = "green"
                document.getElementById("passlogshower1").style.fontWeight = 600;
            } else {
                document.getElementById("passwordbox1").style.border = "thick solid crimson"
                document.getElementById("passlogshower1").textContent = "X";
                document.getElementById("passlogshower1").style.color = "crimson"
                document.getElementById("passlogshower1").style.fontWeight = 600;
            }
            return true;
        });
});

document.getElementById("emailbox").addEventListener("input", function() {
    document.getElementById("emaillogshower").style.display = "block";
    var email = document.getElementById("emailbox").value;
    axios.post('/register/user/verifymail', {
            'email': email,
        })
        .then(res => {
            emailstatus = res['data']['message'];
            if (res['data']['message'] == 'success') {
                document.getElementById("emailbox").style.border = "thick solid green"
                document.getElementById("emaillogshower").textContent = "/";
                document.getElementById("emaillogshower").style.color = "green"
                document.getElementById("emaillogshower").style.fontWeight = 600;
            } else {
                document.getElementById("emailbox").style.border = "thick solid crimson"
                document.getElementById("emaillogshower").textContent = "X";
                document.getElementById("emaillogshower").style.color = "crimson"
                document.getElementById("emaillogshower").style.fontWeight = 600;
            }
        });
});

document.getElementById("mobilebox").addEventListener("input", function() {
    document.getElementById("moblogshower").style.display = "block";
    var phone = document.getElementById("mobilebox").value;
    axios.post('/register/user/verifyphone', {
            'phone': phone,
        })
        .then(res => {
            phonestatus = res['data']['message'];
            if (res['data']['message'] == 'success') {
                document.getElementById("mobilebox").style.border = "thick solid green"
                document.getElementById("moblogshower").textContent = "/";
                document.getElementById("moblogshower").style.color = "green"
                document.getElementById("moblogshower").style.fontWeight = 600;
            } else {
                document.getElementById("mobilebox").style.border = "thick solid crimson"
                document.getElementById("moblogshower").textContent = "X";
                document.getElementById("moblogshower").style.color = "crimson"
                document.getElementById("moblogshower").style.fontWeight = 600;
            }
        });
});

document.getElementById("userlogshower-signup").addEventListener("mouseover", function() {
    alert(unamestatus);
})

document.getElementById("passlogshower-signup").addEventListener("mouseover", function() {
    alert(pass1status);
})

document.getElementById("passlogshower1").addEventListener("mouseover", function() {
    alert(pass2status);
})

document.getElementById("emaillogshower").addEventListener("mouseover", function() {
    alert(emailstatus);
})

document.getElementById("moblogshower").addEventListener("mouseover", function() {
    alert(phonestatus);
})