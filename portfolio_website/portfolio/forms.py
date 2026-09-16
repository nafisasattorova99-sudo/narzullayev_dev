from django import forms

from .models import ContactMessage


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your name'}),
            'email': forms.TextInput(attrs={'placeholder': 'you@example.com or @telegram_username'}),
            'subject': forms.TextInput(attrs={'placeholder': 'Project idea, question, collaboration…'}),
            'message': forms.Textarea(attrs={'placeholder': 'Tell me about your project…', 'rows': 6}),
        }

    def clean_email(self):
        value = self.cleaned_data['email'].strip()
        if len(value) < 3:
            raise forms.ValidationError('Please enter a valid email address or Telegram username.')
        return value

    def clean_message(self):
        message = self.cleaned_data['message'].strip()
        if len(message) < 10:
            raise forms.ValidationError('Please write a bit more about your project (at least 10 characters).')
        return message
