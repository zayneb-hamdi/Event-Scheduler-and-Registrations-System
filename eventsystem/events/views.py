from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import viewsets
from .models import EventCategory, Event, Attendee, Registration
from .serializers import EventCategorySerializer, EventSerializer, AttendeeSerializer, RegistrationSerializer
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated




class EventCategoryViewSet(viewsets.ModelViewSet):
    
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer

class EventViewSet(viewsets.ModelViewSet):
   
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_id = request.query_params.get('category')
        if category_id:
            events = Event.objects.filter(category_id=category_id)
            serializer = self.get_serializer(events, many=True)
            return Response(serializer.data)
        return Response({"detail": "Category ID required."}, status=400)

class AttendeeViewSet(viewsets.ModelViewSet):
    
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
    filter_backends = [SearchFilter]
    search_fields = ['email']
    

class RegistrationViewSet(viewsets.ModelViewSet):
   
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    @action(detail=False, methods=['post'], url_path='cancel')
    def cancel_registration(self, request):
        attendee_id = request.data.get('attendee_id')
        event_id = request.data.get('event_id')

        print(f"Cancel request received: attendee_id={attendee_id}, event_id={event_id}")

        if not attendee_id or not event_id:
           return Response({'error': 'attendee and event are required'}, status=400)

        try:
           registration = Registration.objects.get(attendee_id=attendee_id, event_id=event_id)
           registration.delete()
           return Response({'status': 'registration cancelled'})
        except Registration.DoesNotExist:
            return Response({
            'error': 'registration not found',
            'attendee': attendee_id,
            'event': event_id
        }, status=404)


    

class EventAttendeesView(APIView):
    
    def get(self, request, event_id):
        registrations = Registration.objects.filter(event_id=event_id).select_related('attendee')
        data = [{'id': reg.attendee.id,'name': reg.attendee.name, 'email': reg.attendee.email} for reg in registrations]
        return Response(data)
    
