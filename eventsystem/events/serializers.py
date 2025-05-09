from rest_framework import serializers
from .models import EventCategory, Event, Attendee, Registration

class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    category = EventCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=EventCategory.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'location', 'category', 'category_id']

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    attendee = AttendeeSerializer(read_only=True)
    event = EventSerializer(read_only=True)
    attendee_id = serializers.PrimaryKeyRelatedField(
        queryset=Attendee.objects.all(), source='attendee', write_only=True
    )
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )

    class Meta:
        model = Registration
        fields = ['id', 'attendee', 'event', 'registered_on', 'attendee_id', 'event_id']
