"use client";
import {
  Copy,
  RotateCcw,
  Trash2,
  CalendarDays,
  Mail,
  MessageSquare,
  Link2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Invite } from "./InviteManagement";

export const InviteCard = ({ invite }: { invite: Invite }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://app.rentals.com/invite/${invite.id}`
    );
  };

  const getMethodIcon = (method: string) => {
    if (method === "Email") return <Mail className="w-3 h-3" />;
    if (method === "SMS") return <MessageSquare className="w-3 h-3" />;
    return <Link2 className="w-3 h-3" />;
  };

  return (
    <Card className="mb-4 shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={invite.avatar} />
              <AvatarFallback className="bg-slate-100">
                {invite.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">
                  {invite.name}
                </span>
                <Badge
                  variant={
                    invite.status === "accepted" ? "default" : "secondary"
                  }
                  className="capitalize text-[10px] h-5">
                  {invite.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-500">{invite.email}</p>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 border px-1.5 py-0.5 rounded bg-slate-50">
                  {getMethodIcon(invite.method)} {invite.method}
                </span>
                <span>{invite.location}</span>
                <span>•</span>
                <span>{invite.price}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              Expires: {invite.expiryDate}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <CalendarDays className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Timeline Dates */}
        <div className="grid grid-cols-4 gap-4 mt-6 text-xs border-t pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-slate-400">Sent</span>
            <span className="font-medium">{invite.sentDate}</span>
          </div>
          {invite.viewedDate && (
            <div className="flex flex-col gap-1">
              <span className="text-slate-400">Viewed</span>
              <span className="font-medium">{invite.viewedDate}</span>
            </div>
          )}
          {invite.respondedDate && (
            <div className="flex flex-col gap-1">
              <span className="text-slate-400">Responded</span>
              <span className="font-medium">{invite.respondedDate}</span>
            </div>
          )}
        </div>

        {/* Progress Bar & Status Message */}
        {invite.progress !== undefined && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span>Onboarding Progress</span>
              <span>{invite.progress}%</span>
            </div>
            <Progress
              value={invite.progress}
              className="h-1.5 bg-gray-200 text-orange-500"
            />
          </div>
        )}

        {invite.statusMessage && (
          <div className="mt-4 p-3 bg-orange-50 text-orange-700 text-xs rounded-md border border-orange-100 font-medium">
            {invite.statusMessage}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-3 bg-slate-50/50 flex gap-3 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="h-8 text-xs">
          <Copy className="w-3.5 h-3.5 mr-2" /> Copy Link
        </Button>

        {invite.status === "sent" && (
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <RotateCcw className="w-3.5 h-3.5 mr-2" /> Resend
          </Button>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-slate-600">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will cancel the invitation for {invite.name}. They will no
                longer be able to access the link.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Invite</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Confirm Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
