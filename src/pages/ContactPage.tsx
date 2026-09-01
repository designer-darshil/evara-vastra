import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useShop } from "../context/ShopContext";
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export const ContactPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { siteSettings } = useData();
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry / Size Assistance",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in all required fields.", "info");
      return;
    }

    setIsSubmitted(true);
    showToast("Message received! Our team will get back to you shortly.", "info");
  };

  return (
    <div className="animate-in fade-in duration-500 pt-10 pb-28">
      <div className="container">
        <Breadcrumbs items={[{ label: "Contact Us & Support" }]} onNavigate={onNavigate} />

        <div className="max-w-[720px] my-4 mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1.5">
            CUSTOMER CARE & INQUIRIES
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,4.5vw,3.8rem)] text-foreground leading-[1.1] m-0">
            We're Here to Help.
          </h1>
          <p className="text-[15px] text-muted-foreground mt-2 m-0">
            Reach out to our customer care team for sizing recommendations, order tracking, bulk inquiries, or exchange support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-start">
          {/* Left Studio Information */}
          <div className="flex flex-col gap-7">
            <Card className="bg-background shadow-sm border-border rounded-sm">
              <CardContent className="p-8 flex flex-col gap-6">
                <h3 className="font-serif text-2xl m-0 text-foreground">
                  Surat Atelier & Headquarters
                </h3>

                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{siteSettings.atelierAddress}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>Customer Care: {siteSettings.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span>Email: {siteSettings.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>Support Hours: Mon–Sat, 10:00 AM – 7:30 PM IST</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick WhatsApp Card */}
            <div className="bg-green-50 dark:bg-green-950/30 p-7 border border-green-200 dark:border-green-900 rounded-sm">
              <div className="flex items-center gap-2.5 text-green-800 dark:text-green-500 mb-2">
                <MessageCircle className="w-5 h-5" />
                <h4 className="text-lg font-bold m-0">
                  Instant WhatsApp Assistance
                </h4>
              </div>
              <p className="text-[13px] text-green-700 dark:text-green-600 leading-relaxed m-0 mb-4">
                Chat live with our product specialists for instant real photos, size guides, and order updates.
              </p>
              <a
                href={`https://wa.me/919274344037?text=${encodeURIComponent("Hi Evara Vastra, I need assistance with an order/product.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-sm text-[13px] font-bold no-underline hover:bg-[#128C7E] transition-colors"
              >
                Chat on WhatsApp (+91-92743 44037)
              </a>
            </div>
          </div>

          {/* Right Interactive Form */}
          <Card className="bg-background shadow-sm border-border rounded-sm">
            <CardContent className="p-8 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-12 px-4">
                  <div className="w-[60px] h-[60px] rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl mb-2 text-foreground m-0">
                    Message Transmitted
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.6] max-w-[400px] mx-auto mt-2 mb-8">
                    Thank you for writing to us. Our customer support concierge will respond to <strong className="text-foreground">{form.email}</strong> within 12 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({ name: "", email: "", phone: "", subject: "Order Inquiry", message: "" });
                    }}
                    variant="secondary"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h3 className="font-serif text-[26px] m-0 text-foreground">
                    Send an Online Inquiry
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-foreground">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Pooja Sharma"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-foreground">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="pooja@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-foreground">
                        Phone / WhatsApp Number
                      </label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98450 12345"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-foreground">
                      Subject of Inquiry
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Order Inquiry / Size Assistance">Order Inquiry / Size Assistance</option>
                      <option value="Exchange / Replacement Request">Exchange / Replacement Request</option>
                      <option value="Bulk / Festive Event Orders">Bulk / Festive Event Orders</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-foreground">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please include your order ID if you have an active order..."
                      className="flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="flex items-center justify-center gap-2 h-12"
                  >
                    <Send className="w-4 h-4" /> Submit Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
