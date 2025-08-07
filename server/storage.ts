import { type User, type InsertUser, type Contact, type InsertContact, type ServiceInquiry, type InsertServiceInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createServiceInquiry(inquiry: InsertServiceInquiry): Promise<ServiceInquiry>;
  getContacts(): Promise<Contact[]>;
  getServiceInquiries(): Promise<ServiceInquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private serviceInquiries: Map<string, ServiceInquiry>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.serviceInquiries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      service: insertContact.service ?? null,
      country: insertContact.country ?? null,
      budget: insertContact.budget ?? null,
      customBudget: insertContact.customBudget ?? null,
      timeline: insertContact.timeline ?? null,
      createdAt: new Date() 
  };

    this.contacts.set(id, contact);
    return contact;
  }

  async createServiceInquiry(insertInquiry: InsertServiceInquiry): Promise<ServiceInquiry> {
    const id = randomUUID();
    const inquiry: ServiceInquiry = { 
      ...insertInquiry, 
      id, 
      message: insertInquiry.message || null,
      createdAt: new Date() 
    };
    this.serviceInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getServiceInquiries(): Promise<ServiceInquiry[]> {
    return Array.from(this.serviceInquiries.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
