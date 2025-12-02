import { z } from "zod";

const BaseSchema = z.object({
  employeeId: z.string(),
  attendance: z.enum(["present", "absent", "leave"]).default("present"),
  hours: z.number(),               
  bdDate: z.string().optional(),            
  companies: z.string(),          
  projectDetails: z.string().optional(),
});

// ------------------ WEB DEVELOPER ------------------
const WebDeveloperSchema = BaseSchema.extend({
  role: z.literal("web_developer"),
  numberOfWebsites: z.number(),
});

// ------------------ GRAPHIC DESIGNER ------------------
const GraphicDesignerSchema = BaseSchema.extend({
  role: z.literal("graphic_designer"),
  numberOfDesigns: z.number(),
});

// ------------------ VIDEO EDITOR ------------------
const VideoEditorSchema = BaseSchema.extend({
  role: z.literal("video_editor"),
  numberOfVideos: z.number(),
});

// ------------------ MARKETER ------------------
const MarketerSchema = BaseSchema.extend({
  role: z.literal("marketer"),
  adsPlatform: z.string(),
  numberOfPlatforms: z.number(),
});

export const TaskZodSchema = z.discriminatedUnion("role", [
  WebDeveloperSchema,
  GraphicDesignerSchema,
  VideoEditorSchema,
  MarketerSchema,
]);
