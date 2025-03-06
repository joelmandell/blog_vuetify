// symbols.ts
import type { InjectionKey } from "vue";
import type { IBlogService } from "@/interfaces/IBlogService";

export const BlogServiceKey: InjectionKey<IBlogService> = Symbol("IBlogService");

export default {BlogServiceKey}