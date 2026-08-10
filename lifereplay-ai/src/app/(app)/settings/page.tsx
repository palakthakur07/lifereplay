"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, HardDrive } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function SettingsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = React.useState({
    weeklyRecap: true,
    activityAlerts: true,
    productUpdates: false,
  });

  return (
    <PageWrapper>
      <Container size="md" className="py-8 sm:py-10">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="flex flex-col gap-8">
          <motion.div variants={fadeUp} className="flex flex-col gap-1">
            <Typography.H1 className="text-[28px] sm:text-[32px]">Settings</Typography.H1>
            <Typography.Body className="text-muted-foreground">Manage your profile, appearance, and notifications.</Typography.Body>
          </motion.div>

          <SettingsSection title="Profile" description="This is how you appear across LifeReplay AI.">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-[16px]">AK</AvatarFallback>
              </Avatar>
              <Button variant="secondary" size="sm">
                Change photo
              </Button>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" defaultValue="Aanya Kapoor" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="aanya@lifereplay.ai" />
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Appearance" description="Choose how LifeReplay AI looks on this device.">
            <div className="grid grid-cols-3 gap-3">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTheme(opt.value)}
                  aria-pressed={theme === opt.value}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-4 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    theme === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-border-strong"
                  )}
                >
                  <opt.icon className={cn("h-4 w-4", theme === opt.value ? "text-accent" : "text-muted-foreground")} />
                  <Typography.Small className={cn("font-medium", theme === opt.value ? "text-foreground" : "text-muted-foreground")}>
                    {opt.label}
                  </Typography.Small>
                </button>
              ))}
            </div>
          </SettingsSection>

          <SettingsSection title="Notifications" description="Choose what LifeReplay AI keeps you posted on.">
            {[
              { key: "weeklyRecap" as const, label: "Weekly recap", desc: "A summary of activity every Monday." },
              { key: "activityAlerts" as const, label: "Activity alerts", desc: "When a Space you follow gets updated." },
              { key: "productUpdates" as const, label: "Product updates", desc: "New features and announcements." },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Typography.Small className="font-medium text-foreground">{item.label}</Typography.Small>
                  <Typography.Small className="text-[12px]">{item.desc}</Typography.Small>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                />
              </div>
            ))}
          </SettingsSection>

          <SettingsSection title="Storage" description="How much space your Spaces are using.">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <HardDrive className="h-3.5 w-3.5" />
                  6.1 GB of 10 GB used
                </span>
                <Button variant="ghost" size="sm">
                  Upgrade
                </Button>
              </div>
              <Progress value={61} />
            </div>
          </SettingsSection>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
