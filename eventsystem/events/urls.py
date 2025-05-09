from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import EventAttendeesView, EventCategoryViewSet, EventViewSet, AttendeeViewSet, RegistrationViewSet

router = DefaultRouter()
router.register(r'categories', EventCategoryViewSet)
router.register(r'events', EventViewSet)
router.register(r'attendees', AttendeeViewSet)
router.register(r'registrations', RegistrationViewSet)

urlpatterns = [
    path('', include(router.urls)),
   
    path('events/<int:event_id>/attendees/', EventAttendeesView.as_view()),
]
