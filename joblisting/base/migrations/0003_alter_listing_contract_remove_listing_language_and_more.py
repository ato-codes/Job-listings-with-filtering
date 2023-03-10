# Generated by Django 4.1.5 on 2023-01-18 05:37

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_listing_contract_alter_listing_language_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='contract',
            field=models.CharField(choices=[('Full time', 'Full time'), ('Contract', 'Contract'), ('Part time', 'Part time'), ('Temporary', 'Temporary')], max_length=20, verbose_name='Contract'),
        ),
        migrations.RemoveField(
            model_name='listing',
            name='language',
        ),
        migrations.AlterField(
            model_name='listing',
            name='level',
            field=models.CharField(choices=[('Senior', 'Senior'), ('Entry', 'Entry'), ('No experience required', 'No experience required')], max_length=250, verbose_name='Level'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='logo',
            field=models.FileField(blank=True, null=True, upload_to='media', validators=[django.core.validators.FileExtensionValidator(['pdf', 'doc', 'svg'])]),
        ),
        migrations.RemoveField(
            model_name='listing',
            name='tools',
        ),
        migrations.AddField(
            model_name='listing',
            name='language',
            field=models.ManyToManyField(blank=True, to='base.language'),
        ),
        migrations.AddField(
            model_name='listing',
            name='tools',
            field=models.ManyToManyField(blank=True, to='base.tool'),
        ),
    ]
