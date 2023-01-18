from django.shortcuts import render
from .models import Listing
from .forms import ListingForm
from django.utils import timezone


# Create your views here.


def home(request):
    listings = Listing.objects.all()
    for i in range(len(listings)):
        context = {"listings": listings}
        return render(request, "home.html", context)


def add(request):
    form = ListingForm
    context = {"form": form}
    return render(request, "add.html", context)
