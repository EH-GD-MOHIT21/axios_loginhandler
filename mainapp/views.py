from django.shortcuts import render,redirect
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User,auth
from django.contrib.auth import login,logout
from .models import NewUserModel as usmodel
from django.contrib import messages

# Create your views here.

def loginc(request):

    return render(request,'index.html')
 


@csrf_exempt
def validate(request):
    uname = json.loads(request.body).get('uname')
    if len(User.objects.filter(username=uname)):
        return JsonResponse({"message":"username not available."})
    if len(uname) < 3 or len(uname)==0:
        return JsonResponse({"message":"username min length should be 3."})
    if ' ' in uname:
        return JsonResponse({'message':'username can not contain space'})
    if "'" in uname:
        return JsonResponse({'message':"username can not contain ' "})
    if '"' in uname:
        return JsonResponse({'message':'username cannot contain " '})
    if "(" in uname or ")" in uname or "{" in uname or "}" in uname or "[" in uname or "]" in uname or "|" in uname or "/" in uname or "?" in uname or ">" in uname or "<" in uname or "," in uname or ":" in uname or ";" in uname or "=" in uname or "`" in uname:
        return JsonResponse({'message':'username can contain @!&^%$#*'})

    if len(uname) > 15:
        return JsonResponse({'message':'usernamelength should less than 15'})
    # databse connectivity here.

    return JsonResponse({"message":"success"})


@csrf_exempt
def validate_pass(request):
    password = json.loads(request.body).get('password')
    if len(password)<8 or len(password)==0:
        return JsonResponse({'message':'password should be atleast 8 characters.'})

    if len(password) > 25:
        return JsonResponse({'message': 'password should be max 25 characters.'})

    if password.isalpha() or password.isnumeric():
        return JsonResponse({'message': 'please use digits,special characters,alphabets'})

    return JsonResponse({'message':'success'})
    

@csrf_exempt
def validate_cpass(request):
    passw1 = json.loads(request.body).get('cpass')	
    passw2 = json.loads(request.body).get('pass')

    if len(passw2)<8:
        return JsonResponse({'message':'Please make your password 8 characters long.'})

    if passw1 == passw2:
        return JsonResponse({'message':'success'})
    return JsonResponse({'message':'both password should be same.'})


@csrf_exempt
def verify_mail(request):
    ####### mail sender code here
    
    mailid = json.loads(request.body).get('email')
    if not len(mailid):
        return JsonResponse({'message':'mail id can not be blank.'})
    if mailid.count('.') == 0 or mailid.count('@')!=1 or '.@' in mailid or '@.' in mailid or '..' in mailid:
        return JsonResponse({'message':'mail id not valid.'})
    if mailid.count('.') == 1 and mailid.index('@') - mailid.index('.') > 0 or not mailid[-1].isalpha():
        return JsonResponse({'message':'mail id not valid.'})
    waste = "!#$%^&*()}{[];':?/`~,<>"
    for i in waste:
        if i in mailid:
            return JsonResponse({"message":"mail id not correct."})

    if len(User.objects.filter(email=mailid)):
        return JsonResponse({'message':'This mail is already registerd.'})

    return JsonResponse({'message':'success'})

@csrf_exempt
def verify_phone(request):
    phone = json.loads(request.body).get('phone')
    if '+91' in phone:
        return JsonResponse({'message':'please remove +91.'})
    if not phone.isnumeric():
        return JsonResponse({'message':'phone number should be digits.'})
    if len(phone)!=10:
        return JsonResponse({'message':'phone number should be length 10.'})
    if len(usmodel.objects.filter(phoneno=phone)):
        return JsonResponse({'message':'phone number already exists.'})
    return JsonResponse({'message':'success'})

@csrf_exempt
def adduser(request):
    if request.method == 'POST':
        username = request.POST['username']
        passwd = request.POST['password']
        email = request.POST['email']
        phoneno = request.POST['mobile']
        myuser = User.objects.create_user(username,email,passwd)
        myuser.save()
        mainmodel = usmodel(user=myuser,phoneno=phoneno)
        mainmodel.save()

        return HttpResponse("success <a href='/'>click here to login</a>")
    else:
        return redirect('/')

@csrf_exempt
def authenticateuserlogin(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = auth.authenticate(username=username,password=password)
    if user is None:
        # login(request,user)
        messages.info(request,"Wrong Credentials.")
        return redirect('/')
    else:
        # login(request,user)
        messages.info(request,"successfully logged in.")
        return render(request,'home.html')

def mohit(request):
    if request.method == 'POST':
        return render(request,'home.html',{'message':'success'})
    else:
        return redirect('/')