# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from djangoratings.fields import RatingField


class User(models.Model):
	USERTYPE_OPTIONS = (
			(SUPERUSER, 'SU'),
			(PENDING_REJECTION, 'PR'),
			(DEVELOPER, 'DE'),
			(CLIENT, 'CL'),
			(REJECTED, 'RE'),
		)
	UserType = models.CharField(
			max_length = 2,
			choices = UPSERTYPE_OPTIONS,
			default = REJECTED,
		)
	UserId = models.AutoField(primary_key=True)
	UserName = models.CharField(max_length=15, unique=True)
	Password = models.CharField(max_length=15)
	BankAccountID = models.ForeignKey(BankInfo.BankAccountID)
	Email = models.CharField(max_length=50, unique=True)
	Warnings = models.IntegerField(default=0)
	def type_setting(self):
		if self.Warnings >= 3:
			self.UserType = 'RE'
	def __str__(self):
		return(self.UserId)

class BankInfo(models.Model):
	BankAccountID=models.AutoField(primary_key=True)
	AccountNum=models.CharField(max_length=20)
	AccountName=models.CharField()
	def __str__(self):
		return(self.BankAccountID, AccountName)

class BlackList(models.Model):
	UserId=models.ForeignKey(User.UserId)
	StartDate=models.DateField()
	EndDate=models.DateField()
	LastLogin=models.DateField()
	def __str__(self):
		return(self.UserId, self.StartDate)

class SystemDemand(models.Model):
	DEMAIND_OPTIONS = (
			(OPEN, 'OP'),
			(IN_PROGRESS,'IP'),
			(CLOSED,'CL'),
			(COMPLTED,'CO'),
		)
	DemandType=models.CharField(
		max_length=2,
		choices = DEMAIND_OPTIONS,
		default = OPEN,
		)
	DemandId=models.AutoField(primary_key=True)
	UserId_Client=models.ForeignKey(User.UserId)
	UserId_Dev=models.ForeignKey(User.UserId, null=True)
	BidId=models.ManyToManyField(Bid.BidId)
	Description=models.TextField()
	Skills=models.TextField()
	StartDate=models.DateField()
	EndDate=models.DateField()
	Title=models.TextField()
	def __str__(self):
		return(self.Title, self.DemandId)

class Bid(models.Model):
	UserId=models.ForeignKey(User.UserId)
	BidAmount=models.IntegerField()
	Timeline=models.TextField()
	BidId=models.AutoField(primary_key=True)
	def __str__(self):
		return(self.BidAmount, self.UserId)

class MoneyTransfer(models.Model):
	TransactionId = models.AutoField(primary_key=True)
	DemandId = models.ForeignKey(SystemDemand.DemandId)
	BidId=models.ForeignKey(models.BidId)
	UserId_To = models.ForeignKey(User.UserId)
	UserId_From = models.ForeignKey(User.UserId)
	Amount = models.IntegerField()
	def __str__(self):
		return(self.Amount, self.UserId_To, self.UserId_From)

class RatingHistory(models.Model):
	RatingId = models.AutoField(primary_key=True)
	DemandId = models.ForeignKey(SystemDemand.DemandId)
	Rating = models.RatingField(range=10)
	RatingDescription = models.TextField(null=True)
	UserId = models.ForeignKey(User.UserId)
	def __str__(self):
		return(self.Rating, self.RatingDescription)

