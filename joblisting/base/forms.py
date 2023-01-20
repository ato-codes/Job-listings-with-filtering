from django.forms import ModelForm, widgets
from django import forms
from .models import Listing

class ListingForm(ModelForm):
    class Meta:
        model = Listing
        exclude = ['user',]
    widgets = {
        'language': forms.Select(),
        'tools': forms.RadioSelect(),
    }