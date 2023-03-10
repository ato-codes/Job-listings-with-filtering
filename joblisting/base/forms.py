from django import forms
from .models import Listing

class ListingForm(forms.ModelForm):
    class Meta:
        model = Listing
        exclude = ['user',]
    widgets = {
        'language': forms.CharField(),
        'tools': forms.CharField(),
    }