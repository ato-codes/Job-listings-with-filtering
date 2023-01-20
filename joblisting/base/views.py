from django.shortcuts import render, redirect
from .models import Listing,Language, Tool
from .forms import ListingForm
from django.contrib.auth.models import User
from django.utils import timezone


# Create your views here.


def home(request):
    listings = Listing.objects.all()
    language = Language.objects.all()
    for i in range(len(listings)):
        context = {"listings": listings, "lang": language}
        return render(request, "home.html", context)


def add(request):
    form = ListingForm

    if request.method == 'POST':
        form = ListingForm(request.POST)
        Listing.objects.create(user="Dagmawi", company=form['company'].value(), new=form['new'].value(),
                                 featured=form['featured'].value(), role=form['role'].value(),
                                 contract=form['contract'].value(), location=form['location'].value(),
                                 level=form['level'].value())
        my_listing = Listing.objects.get(company=form['company'].value())
        for language in form['language'].value():
            for lang in language.split(","):
                x = Language.objects.create(name=lang,  created_for= form['company'].value())
        my_listing.language.add(Language.objects.get())
        return redirect("/")
    context = {"form": form}
    return render(request, "add.html", context)
