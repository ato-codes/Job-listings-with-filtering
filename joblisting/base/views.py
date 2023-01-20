from django.shortcuts import render, redirect
from .models import Listing, Language, Tool
from .forms import ListingForm
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from django.utils import timezone


# Create your views here.


def home(request):
    listings = Listing.objects.all()
    language = Language.objects.all()
    for i in range(len(listings)):
        context = {"listings": listings, "lang": language}
        return render(request, "home.html", context)


def add(request, lang_list=[], tools_list=[]):
    form = ListingForm()
    if request.method == 'POST':
        language = request.POST.get("languageInput")
        tools = request.POST.get("toolsInput")
        form = ListingForm(request.POST)
        if language is not None:
            new_lang = Language(name=language)
            new_lang.save()
            lang_list.append(new_lang.id)
        print(lang_list)
        if tools is not None:
            new_tool = Tool(name=tools)
            new_tool.save()
            tools_list.append(new_tool.id)
        print(tools_list)
        if form.is_valid():
            form.save()
            new_listing = Listing.objects.get(company=request.POST.get("company"))
            for l in lang_list:
                new_listing.language.add(l)
            for t in tools_list:
                new_listing.tools.add(t)
            new_listing.save()

            return redirect("/")

    lang_list = []
    tools_list = []
    context = {"form": form}
    return render(request, "add.html", context)
