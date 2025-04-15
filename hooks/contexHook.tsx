import Storage from "expo-sqlite/kv-store";
import { projectType, taskType } from "@/types";
import uuid from "react-native-uuid";
import * as Notifications from "expo-notifications";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type createContextType = {
  tasks: taskType[];
  projects: projectType[];
  createTask: (newTask: taskType) => Promise<void>;
  updateTask: (taskId: string, updatedTask: taskType) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  createProject: (newProject: projectType) => Promise<void>;
  updateProject: (
    projectId: string,
    updatedProject: projectType
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getProjectbyid: (projectId: string) => projectType | undefined;
  getTaskbyid: (taskId: string) => taskType | undefined;
  getCurrentDayTasks: () => taskType[];
  getTasksByDate: (date: string) => taskType[];
  getTasksByprojectid: (id: string) => taskType[];
  scheduleTaskReminder: (task: taskType) => Promise<void>;
  cancelNotification: (notificationId: string) => Promise<void>;
};

// Create the context
const AppContext = createContext<createContextType | null>(null);

type childrenPropstype = {
  children: ReactNode;
};

// Provider component
export function AppProvider({ children }: childrenPropstype) {
  const [tasks, settasks] = useState<taskType[]>([]);
  const [projects, setprojects] = useState<projectType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Load projects and tasks from key-value store
      const storedProjects = await Storage.getItem("projects");
      const storedTasks = await Storage.getItem("tasks");

      if (storedProjects) {
        const data = JSON.parse(storedProjects).filter(
          (item: projectType) => item.is_deleted === false
        );
        setprojects(data); // Parse the stringified JSON data
      }

      if (storedTasks) {
        console.log("data");
        const data = JSON.parse(storedTasks).filter(
          (item: taskType) => item.is_deleted === false
        );

        settasks(data);
      }
    };

    loadData();
  }, []);

  // Create project
  const createProject = async (newProject: projectType) => {
    const uniqueId = uuid.v4();
    console.log(uniqueId);
    newProject["id"] = uniqueId;
    newProject["is_deleted"] = false;
    newProject["is_done"] = false;
    newProject["created_at"] = new Date().toString();
    newProject["status"] = "pending";
    const newProjects = [...projects, newProject];
    setprojects(newProjects);

    // Save updated projects to key-value store
    await Storage.setItem("projects", JSON.stringify(newProjects));
  };

  // Create task
  const createTask = async (newTask: taskType) => {
    const uniqueId = uuid.v4();
    newTask["id"] = uniqueId;
    newTask["is_deleted"] = false;
    newTask["is_done"] = false;
    newTask["created_at"] = new Date().toString();
    const newTasks = [...tasks, newTask];
    settasks(newTasks);
    scheduleTaskReminder(newTask);

    // Save updated tasks to key-value store
    await Storage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Update project
  const updateProject = async (
    projectId: string,
    updatedProject: projectType
  ) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? updatedProject : project
    );

    // Save updated projects to key-value store
    await Storage.setItem("projects", JSON.stringify(updatedProjects));
    setprojects(updatedProjects.filter((item) => item.is_deleted === false));
  };
  // get project by id
  const getProjectbyid = (projectId: string) => {
    return projects.find((item) => item.id === projectId);
  };

  // get project by id
  const getTaskbyid = (taskId: string) => {
    return tasks.find((item) => item.id === taskId);
  };
  // get current Day tasks
  const getCurrentDayTasks = () => {
    const currentDate = new Date().toLocaleDateString();
    return tasks.filter(
      (item) =>
        currentDate === new Date(item.start_date as string).toLocaleDateString()
    );
  };

  // get current Day tasks
  const getTasksByDate = (date: string) => {
    const currentDate = new Date(date).toLocaleDateString();
    return tasks.filter(
      (item) =>
        currentDate === new Date(item.start_date as string).toLocaleDateString()
    );
  };

  // get tasks by project id
  const getTasksByprojectid = (id: string) => {
    return tasks.filter((item) => id === item.project_id);
  };

  // Update task
  const updateTask = async (taskId: string, updatedTask: taskType) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );

    // Save updated tasks to key-value store
    await Storage.setItem("tasks", JSON.stringify(updatedTasks));
    settasks(updatedTasks.filter((item) => item.is_deleted === false));
  };

  // Soft delete project
  const deleteProject = async (projectId: string) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setprojects(updatedProjects);

    // Save updated projects to key-value store
    await Storage.setItem("projects", JSON.stringify(updatedProjects));
  };

  // Soft delete task
  const deleteTask = async (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    settasks(updatedTasks);

    // Save updated tasks to key-value store
    await Storage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const scheduleTaskReminder = async (task: taskType) => {
    const datePart = new Date(task.start_date as string); // full Date object, use only Y/M/D
    const timePart = new Date(task.start_time as string); // full Date object, use only H/M/S

    const combinedDateTime = new Date(
      datePart.getFullYear(),
      datePart.getMonth(),
      datePart.getDate(),
      timePart.getHours(),
      timePart.getMinutes(),
      timePart.getSeconds()
    );

    const schedulingOptions = {
      content: {
        title: `⏰ Task Reminder`,
        body: `Don't forget to start: "${task.title}"`,
        data: { taskId: task.id },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: combinedDateTime,
      }, // Fires at this exact combined datetime
    };

    try {
      const notificationId = await Notifications.scheduleNotificationAsync(
        schedulingOptions as any
      );
      console.log("Notification scheduled with ID:", notificationId);

      // Save ID if needed for cancel/reschedule
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  const cancelNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        projects,
        createTask,
        updateTask,
        deleteTask,
        createProject,
        updateProject,
        deleteProject,
        getProjectbyid,
        getTaskbyid,
        getCurrentDayTasks,
        getTasksByDate,
        getTasksByprojectid,
        scheduleTaskReminder,
        cancelNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
