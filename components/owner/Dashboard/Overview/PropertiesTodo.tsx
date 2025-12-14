"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  ListChecks,
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";

const initialProperties = [
  {
    id: "PR0-001",
    name: "Silver Oak Residency",
    tenants: 5,
    units: "15/255",
    location: "Dallas",
    type: "Villa",
    typeColor: "bg-green-100 text-green-800",
  },
  {
    id: "PR0-002",
    name: "Sunview Heights",
    tenants: 6,
    units: "1/255",
    location: "Portland",
    type: "Commercial",
    typeColor: "bg-red-100 text-red-800",
  },
  {
    id: "PR0-003",
    name: "Crystal Garden Apartments",
    tenants: 3,
    units: "15/255",
    location: "Baltimore",
    type: "Commercial",
    typeColor: "bg-red-100 text-red-800",
  },
  {
    id: "PR0-004",
    name: "Blue Horizon Villa",
    tenants: 4,
    units: "55/255",
    location: "Denver",
    type: "House",
    typeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "PR0-005",
    name: "Maple Leaf Estate",
    tenants: 2,
    units: "25/255",
    location: "Las Vegas",
    type: "House",
    typeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "PR0-006",
    name: "Emerald Court",
    tenants: 1,
    units: "45/255",
    location: "Memphis",
    type: "Villa",
    typeColor: "bg-green-100 text-green-800",
  },
  {
    id: "PR0-008",
    name: "Golden Nest Homes",
    tenants: 7,
    units: "15/255",
    location: "Baltimore",
    type: "Commercial",
    typeColor: "bg-red-100 text-red-800",
  },
];

const schedules = [
  {
    id: "sch1",
    title: "Property Inspection",
    property: "Everest Residency, Kathmandu",
    date: "Thu, 15 Feb 2023",
    time: "01:00 PM - 02:20 PM",
    color: "bg-green-600",
  },
  {
    id: "sch2",
    title: "Lease Renewal Check",
    property: "Maple Villa, Pokhara",
    date: "Thu, 15 Feb 2023",
    time: "01:00 PM - 02:20 PM",
    color: "bg-blue-600",
  },
  {
    id: "sch3",
    title: "Move-in Inspection",
    property: "Skyline Apartment, Lalitpur",
    date: "Thu, 15 Feb 2023",
    time: "01:00 PM - 02:20 PM",
    color: "bg-orange-600",
  },
];

const recentActivities = [
  {
    id: "act1",
    description: "Rent payment received - Unit 2A",
    amount: "$1,200",
    date: "2025-01-28",
    status: "Success",
    statusColor: "text-green-600",
  },
  {
    id: "act2",
    description: "New complaint filed - Unit 3B",
    amount: "Medium",
    date: "2025-01-26",
    status: "Warning",
    statusColor: "text-yellow-600",
  },
  {
    id: "act3",
    description: "Lease renewal signed - Unit 1C",
    amount: "$1,200",
    date: "2025-01-27",
    status: "Success",
    statusColor: "text-green-600",
  },
  {
    id: "act4",
    description: "Rent payment received - Unit 2A",
    amount: "$1,200",
    date: "2025-01-28",
    status: "Success",
    statusColor: "text-green-600",
  },
  {
    id: "act5",
    description: "New complaint filed - Unit 3B",
    amount: "Urgent",
    date: "2025-01-27",
    status: "Urgent",
    statusColor: "text-red-600",
  },
  {
    id: "act6",
    description: "Lease renewal signed - Unit 1C",
    amount: "$1,200",
    date: "2025-01-27",
    status: "Success",
    statusColor: "text-green-600",
  },
];

const initialTodos = [
  { id: "todo-1", text: "Add Holidays" },
  { id: "todo-2", text: "Add Meeting to Client" },
  { id: "todo-3", text: "Chat with Adrian" },
  { id: "todo-4", text: "Management Call" },
  { id: "todo-5", text: "Add Payroll" },
  { id: "todo-6", text: "Add Policy for Increment" },
];

const ProgressBar = ({ progress, total = 255 }) => {
  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <div className="w-full bg-slate-200 rounded-full h-1">
      <div
        className="bg-orange-500 h-1 rounded-full flex items-center justify-center transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const SortableItem = ({ todo, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    boxShadow: isDragging ? "0 4px 10px rgba(0,0,0,0.1)" : "none",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 transition-all ${
        isDragging ? "bg-blue-50/70" : "hover:bg-gray-50"
      }`}>
      <div
        className="flex items-center space-x-3 w-full"
        {...listeners}
        {...attributes}>
        <ListChecks className="h-4 w-4 text-gray-400 shrink-0" />
        <span className="text-sm font-medium items-center flex gap-2 text-gray-800 select-none  truncate">
          <Checkbox /> {todo.text}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-400 hover:text-red-600 hover:bg-red-50 ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}>
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

const TodoCard = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Set up DND sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Simple in-memory reordering logic (similar to array.splice/slice)
        const newItems = Array.from(items);
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        return newItems;
      });
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === "") return;

    const newTodo = {
      id: `todo-${Date.now()}`,
      text: newTodoText.trim(),
    };
    setTodos([newTodo, ...todos]); // Add new item to the top
    setNewTodoText("");
    setIsDialogOpen(false);
  };

  const handleDeleteTodo = (idToDelete) => {
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  };

  return (
    <Card className="shadow-sm border-gray-100 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <ListChecks className="w-5 h-5 mr-2 text-orange-600" />
          To-Do
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-orange-500 text-white hover:bg-orange-600 hover:text-white border-none transition-colors"
              aria-label="Add new todo">
              <Plus className="h-4 w-4" aria-label="add to do item" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-lg">
            <DialogHeader>
              <DialogTitle
                className="text-lg font-bold"
                aria-label="add to do item">
                Add New To-Do Item
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTodo} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="todo-text" className="text-right">
                  Task
                </Label>
                <Input
                  id="todo-text"
                  placeholder="e.g., Follow up with client"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  className="col-span-3 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 mt-2">
                <Check className="w-4 h-4 mr-2" /> Add Task
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="p-0 overflow-y-auto flex-grow">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-8">
            No tasks! Time to relax.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={todos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}>
              <div className="group">
                {todos.map((todo) => (
                  <SortableItem
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
};

export default function PropertiesTodo() {
  const tenantAvatar = (count) => (
    <div className="flex items-center -space-x-2">
      <Avatar className="h-7 w-7 border-2 border-white">
        <AvatarFallback className="bg-blue-500 text-white text-xs">
          J
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-7 w-7 border-2 border-white">
        <AvatarFallback className="bg-pink-500 text-white text-xs">
          A
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-7 w-7 border-2 border-white">
        <AvatarFallback className="bg-yellow-500 text-white text-xs">
          S
        </AvatarFallback>
      </Avatar>
      {count > 3 && (
        <Badge className="bg-gray-100 text-gray-600 text-[10px] font-medium h-6 px-2 border border-gray-200">
          +{count - 3}
        </Badge>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-4 px-0 md:px-0 md:p-8 space-y-6">
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <div className="lg:col-span-2 ">
          <Card className="shadow-sm border-gray-100 h-[55vh]">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Properties
              </CardTitle>
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3 text-sm">
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50 border-b-0">
                    <TableHead className="w-[10%] text-gray-500 font-medium py-3 rounded-l-lg">
                      ID
                    </TableHead>
                    <TableHead className="w-[20%] text-gray-500 font-medium py-3">
                      Name
                    </TableHead>
                    <TableHead className="w-[20%] text-gray-500 font-medium py-3">
                      Tenants
                    </TableHead>
                    <TableHead className="w-[15%] text-gray-500 font-medium py-3">
                      Units
                    </TableHead>
                    <TableHead className="w-[20%] text-gray-500 font-medium py-3">
                      Location
                    </TableHead>
                    <TableHead className="w-[15%] text-gray-500 font-medium py-3 rounded-r-lg">
                      Type
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialProperties.map((property) => (
                    <TableRow
                      key={property.id}
                      className="border-b last:border-b-0 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800 text-sm">
                        {property.id}
                      </TableCell>
                      <TableCell className="font-medium text-gray-800 text-sm">
                        {property.name}
                      </TableCell>
                      <TableCell>{tenantAvatar(property.tenants)}</TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {property.units}
                        <ProgressBar
                          progress={Number.parseInt(
                            property.units.split("/")[0]
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {property.location}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`px-2 py-1 text-xs font-medium rounded-md ${property.typeColor}`}>
                          {property.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-gray-100 lg:w-[103.5%] xl:w-[102.5%] 2xl:w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Deals From Agents
            </CardTitle>
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3 text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <p className="text-xs font-semibold text-gray-600 border-b pb-1">
              Today
            </p>
            <DealItem
              name="Andrew Jernia"
              id="#011021"
              property="Maple Villa / Location: Pokhara"
            />

            <p className="text-xs font-semibold text-gray-600 border-b pb-1">
              Tomorrow
            </p>
            <DealItem
              name="Mary Zeen"
              id="#02045"
              property="Skyline Residency / Location: Kathmandu"
            />
            <DealItem
              name="Antony Lewis"
              id="#03099"
              property="Greenleaf Apartment / Location: Lalitpur"
            />

            <p className="text-xs font-semibold text-gray-600 border-b pb-1">
              25 Jan 2025
            </p>
            <DealItem
              name="Doglas Martini"
              id="#04107"
              property="Horizon Tower / Location: Chitwan"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Schedules
            </CardTitle>
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3 text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="relative p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                <Badge
                  className={`absolute top-0 left-0 rounded-b-md rounded-t-lg px-2 py-0.5 text-xs font-medium text-white ${schedule.color}`}>
                  {schedule.title}
                </Badge>
                <p className="text-sm font-semibold text-gray-800 mt-4">
                  {schedule.property}
                </p>
                <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3 shrink-0" />{" "}
                    <span>{schedule.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 shrink-0" />{" "}
                    <span>{schedule.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities Card */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Activities
            </CardTitle>
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3 text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.date}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${activity.statusColor}`}>
                    {activity.amount}
                  </p>
                  <p className={`text-[10px] font-medium mt-0.5 text-gray-400`}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <TodoCard />
      </div>
    </div>
  );
}

const DealItem = ({ name, id, property }) => (
  <div className="flex items-start space-x-3 border border-dashed border-gray-200 bg-[#F8F9FA] p-2 rounded-md ">
    <Avatar className="h-10 w-10 shrink-0">
      <AvatarFallback className="bg-orange-500 text-white font-medium">
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
    <div className="flex justify-between flex-grow">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{id}</p>
      </div>
      <Badge
        variant="secondary"
        className="rounded-md mt-1 text-xs font-normal text-white bg-[#3B7080] border border-gray-200 w-fit max-w-full truncate">
        {property}
      </Badge>
    </div>
  </div>
);
