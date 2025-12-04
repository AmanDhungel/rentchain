import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  ChevronDown,
  Camera,
  AlertTriangle,
  Eye,
  Download,
  Users,
  Mail,
  Phone,
  Edit,
  Plus,
  Building,
} from "lucide-react";
import { FC } from "react";

interface Reporter {
  name: string;
  role: string;
  email: string;
}

interface Watcher extends Reporter {
  notifications: number;
  added: string;
}

interface Note {
  author: string;
  role: string;
  type: "Internal" | "Public";
  content: string;
  date: string;
}

interface Evidence {
  type: "image" | "video";
  title: string;
  uploadedBy: string;
  date: string;
  size: string;
  location: string;
  previewUrl?: string;
}

interface ComplaintData {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  created: string;
  updated: string;
  tags: string[];
  slaBreach: boolean;
  slaHoursOverdue: number;
  reporter: Reporter;
  respondent: Reporter;
  watchers: Watcher[];
  notes: Note[];
  evidence: Evidence[];
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "../ui";
import Link from "next/link";

// --- Mock Data ---

const COMPLAINT_DATA: ComplaintData = {
  id: "COMP-2024-001",
  title: "Heating System Not Working",
  description:
    "The heating system in my unit has been malfunctioning for the past two days. Temperature is dropping below comfortable levels.",
  category: "Maintenance",
  severity: "High",
  created: "Jan 15, 2024, 08:15 PM",
  updated: "Jan 16, 2024, 04:00 PM",
  tags: ["urgent", "hvac", "winter"],
  slaBreach: true,
  slaHoursOverdue: 15953,
  reporter: {
    name: "John Smith",
    role: "Tenant",
    email: "john.smith@email.com",
  },
  respondent: {
    name: "Property Manager",
    role: "Admin",
    email: "admin@property.com",
  },
  watchers: [
    {
      name: "John Smith",
      role: "Tenant",
      email: "john.smith@email.com",
      notifications: 4,
      added: "Jan 15, 2024, 08:15 PM",
    },
    {
      name: "Property Manager",
      role: "Admin",
      email: "admin@property.com",
      notifications: 4,
      added: "Jan 15, 2024, 08:15 PM",
    },
  ],
  notes: [
    {
      author: "Mike Tech",
      role: "Staff",
      type: "Internal",
      content:
        "Initial assessment completed. Heating unit has a faulty thermostat that needs replacement. Vendor has been contacted. status update",
      date: "Jan 16, 2024, 03:15 PM",
    },
    {
      author: "Property Manager",
      role: "Admin",
      type: "Public",
      content:
        "Thank you for reporting this issue. We have assigned a technician and expect to have this resolved within 24 hours.",
      date: "Jan 15, 2024, 10:15 PM",
    },
  ],
  evidence: [
    {
      type: "image",
      title: "Heating unit not working",
      uploadedBy: "John Smith",
      date: "Jan 15, 2024, 08:30 PM",
      size: "1.95 MB",
      location: "Unit 101 - Living Room",
      previewUrl: "https://placehold.co/100x70/EAEAEA/808080?text=IMG",
    },
    {
      type: "video",
      title: "Temperature reading video",
      uploadedBy: "John Smith",
      date: "Jan 15, 2024, 08:30 PM",
      size: "15 MB",
      location: "Unit 101 - Bedroom",
    },
  ],
};

const STATUS_OPTIONS: string[] = [
  "New",
  "Open",
  "In Progress",
  "On Hold",
  "Resolved",
  "Closed",
];
const ASSIGN_OPTIONS: string[] = [
  "Unassigned",
  "Mike Tech",
  "Jane Doe",
  "Vendor",
];
const NOTE_TYPES: string[] = ["General", "Technical", "Follow-up"];

// --- Tab Content Components ---

interface DetailBlockProps {
  label: string;
  value: string | number;
}

const DetailBlock: FC<DetailBlockProps> = ({ label, value }) => (
  <div className="pb-4 border-b border-gray-100">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base font-semibold text-gray-800 pt-0.5">{value}</p>
  </div>
);

const PartiesInvolvedBlock: FC<Reporter> = ({ name, role, email }) => (
  <div className="py-4 border-b border-gray-100 flex justify-between items-center">
    <div>
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-800">{name}</span>
        <Badge variant="default" className="uppercase">
          {role}
        </Badge>
      </div>
      <div className="text-sm text-gray-500 mt-0.5 flex items-center space-x-1">
        <Mail className="h-4 w-4" />
        <span>{email}</span>
      </div>
    </div>
    <div className="flex items-center space-x-2 text-gray-500">
      <Phone className="h-4 w-4 hover:text-orange-500 cursor-pointer" />
      <Mail className="h-4 w-4 hover:text-orange-500 cursor-pointer" />
    </div>
  </div>
);

interface NoteItemProps {
  note: Note;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => (
  <div className="py-4 border-b border-gray-100 flex justify-between space-x-4">
    <div className="grow">
      <div className="flex items-center space-x-2 mb-1">
        <span className="font-semibold text-gray-800">{note.author}</span>
        <Badge variant="default" className="uppercase">
          {note.role}
        </Badge>
        <Badge
          variant={note.type === "Internal" ? "highpriority" : "secondary"}
          className="text-[10px] uppercase">
          {note.type}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{note.content}</p>
    </div>
    <span className="text-xs text-gray-500 shrink-0">
      {note.date.split(", ")[1]}
    </span>
  </div>
);

interface EvidenceItemProps {
  item: Evidence;
}

const EvidenceItem: FC<EvidenceItemProps> = ({ item }) => (
  <div className="py-4 border-b border-gray-100 flex space-x-4">
    {item.type === "image" && (
      <Camera className="h-6 w-6 text-orange-500 shrink-0" />
    )}
    {item.type === "video" && (
      <FileText className="h-6 w-6 text-orange-500 shrink-0" />
    )}

    <div className="grow">
      <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
        {item.title}
      </h4>
      <p className="text-xs text-gray-600 mt-1">
        Uploaded by {item.uploadedBy} {item.date} | {item.size} |{" "}
        <span className="text-orange-500">{item.location}</span>
      </p>
      {item.previewUrl && (
        <Image
          width={500}
          height={500}
          src={item.previewUrl}
          alt="Evidence Preview"
          className="w-24 h-16 object-cover rounded-lg mt-2 shadow-md"
        />
      )}
    </div>

    <div className="flex space-x-3 text-gray-500 items-start flex-shrink-0">
      <Eye className="h-5 w-5 hover:text-orange-500 cursor-pointer" />
      <Download className="h-5 w-5 hover:text-orange-500 cursor-pointer" />
    </div>
  </div>
);

interface WatcherItemProps {
  watcher: Watcher;
}

const WatcherItem: FC<WatcherItemProps> = ({ watcher }) => (
  <div className="py-4 border-b border-gray-100 flex justify-between items-center">
    <div>
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-800">{watcher.name}</span>
        <Badge variant="default" className="uppercase">
          {watcher.role}
        </Badge>
      </div>
      <div className="text-sm text-gray-500 mt-0.5">{watcher.email}</div>
    </div>
    <div className="text-right text-sm text-gray-600">
      <p className="text-xs text-gray-500">
        Added {watcher.added.split(", ")[1]}
      </p>
      <p className="text-xs text-gray-400">
        {watcher.notifications} notifications enabled
      </p>
    </div>
  </div>
);

interface QuickActionButtonProps {
  icon: FC<any>;
  label: string;
}

const QuickActionButton: FC<QuickActionButtonProps> = ({
  icon: Icon,
  label,
}) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
    <Icon className="h-5 w-5 text-gray-600" />
    <span className="font-medium text-gray-700">{label}</span>
  </div>
);

interface TabContentProps {
  data: ComplaintData;
}

const OverviewTab: FC<TabContentProps> = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
    <div className="lg:col-span-4 space-y-6">
      <div className="p-6 bg-white rounded-xl w-full shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Complaint Details
        </h3>

        <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
        <p className="text-base text-gray-700 mb-6">{data.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Category</p>
            <div className="flex space-x-2">
              <Badge variant="default">Maintenance</Badge>
              <Badge variant="default">hvac</Badge>
            </div>
          </div>
          <DetailBlock label="Severity" value={data.severity} />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6">
          <DetailBlock label="Created" value={data.created} />
          <DetailBlock label="Last Updated" value={data.updated} />
        </div>

        <div className="pt-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Tags</p>
          <div className="flex space-x-2">
            {data.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Parties Involved
        </h3>
        <PartiesInvolvedBlock
          name={data.reporter.name}
          role={data.reporter.role}
          email={data.reporter.email}
        />
        <PartiesInvolvedBlock
          name={data.respondent.name}
          role={data.respondent.role}
          email={data.respondent.email}
        />
      </div>
    </div>
  </div>
);

const EvidenceTab: FC<TabContentProps> = ({ data }) => (
  <div className=" space-y-6">
    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
      <h3 className="text-lg font-bold text-gray-800">
        Evidence & Attachments
      </h3>
      <Button variant="outline">
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-4 divide-y divide-gray-100 border border-gray-200">
      {data.evidence.map((item, index) => (
        <EvidenceItem key={index} item={item} />
      ))}
    </div>
  </div>
);

const NotesTab: FC<TabContentProps> = ({ data }) => (
  <div className="space-y-6">
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add Note</h3>
      <Textarea placeholder="Enter your note..." className="mb-4" />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="General" />
            </SelectTrigger>
            <SelectContent>
              {NOTE_TYPES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch />
            <label
              htmlFor="internal-note"
              className="text-sm font-medium text-gray-700">
              Internal note
            </label>
          </div>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>
    </div>

    {/* Existing Notes */}
    <div className="bg-white rounded-xl shadow-sm p-6 divide-y divide-gray-100 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Existing Notes</h3>
      {data.notes.map((note, index) => (
        <NoteItem key={index} note={note} />
      ))}
    </div>
  </div>
);

const WatchersTab: FC<TabContentProps> = ({ data }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
      <h3 className="text-lg font-bold text-gray-800">Watchers</h3>
      <Button variant="default" className="bg-orange-500">
        <Users className="h-4 w-4 mr-2" />
        Add Watcher
      </Button>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-4 divide-y divide-gray-100 border border-gray-200">
      {data.watchers.map((watcher, index) => (
        <WatcherItem key={index} watcher={watcher} />
      ))}
    </div>
  </div>
);

const ActionsTab: FC = () => (
  <div className="space-y-8">
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Status Management</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium text-gray-700">
            Change Status
          </label>
          <Select>
            <SelectTrigger className="w-full rounded-none!">
              <SelectValue placeholder="New" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Assign To</label>
          <Select>
            <SelectTrigger className="w-full rounded-none!">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {ASSIGN_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickActionButton icon={FileText} label="Request More Information" />
        <QuickActionButton icon={Users} label="Offer Mediation" />
        <QuickActionButton icon={AlertTriangle} label="Escalate to Admin" />
        <QuickActionButton
          icon={CheckCircle}
          label="Apply Remediation Credit"
        />
        <QuickActionButton icon={Building} label="Escalate to Municipality" />
      </div>
    </div>
  </div>
);

// --- Main App Component ---

interface ComplaintDetailViewProps {
  data: ComplaintData;
}

const ComplaintDetailView: FC<ComplaintDetailViewProps> = () => {
  const currentStatus: string = "New";
  const isHighPriority: boolean = COMPLAINT_DATA.severity === "High";

  return (
    <div className="min-h-screen bg-white p-4 pl-0 sm:pl-0 lg:pl-0 sm:p-6 lg:p-8 font-sans">
      <div className="">
        <header className="pb-6 mb-6">
          <div className="flex items-center space-x-4 mb-2">
            <Link href="/complaints/complaint-and-dispute">
              <ArrowLeft className="h-6 w-6 text-gray-500 cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {COMPLAINT_DATA.id}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {COMPLAINT_DATA.title}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 -mt-10 mb-6">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-gray-700 border-gray-300">
              {currentStatus}
            </Button>
            <Button
              variant={isHighPriority ? "destructive" : "default"}
              size="sm"
              className={isHighPriority ? "bg-red-600 hover:bg-red-700" : ""}>
              {COMPLAINT_DATA.severity}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-gray-700 border-gray-300">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>

          {COMPLAINT_DATA.slaBreach && (
            <div className="flex items-center space-x-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-md mt-4">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-red-700">
                  SLA Breach Detected
                </h3>
                <p className="text-sm text-red-600">
                  Acknowledgment overdue by {COMPLAINT_DATA.slaHoursOverdue}{" "}
                  hours
                </p>
              </div>
            </div>
          )}
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="watchers">Watchers</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="w-full">
            <OverviewTab data={COMPLAINT_DATA} />
          </TabsContent>
          <TabsContent value="evidence">
            <EvidenceTab data={COMPLAINT_DATA} />
          </TabsContent>
          <TabsContent value="notes">
            <NotesTab data={COMPLAINT_DATA} />
          </TabsContent>
          <TabsContent value="watchers">
            <WatchersTab data={COMPLAINT_DATA} />
          </TabsContent>
          <TabsContent value="actions">
            <ActionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplaintDetailView;
