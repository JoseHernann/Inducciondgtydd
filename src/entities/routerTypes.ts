// src/router/routerTypes.ts
import { RouteRecordRaw } from 'vue-router';

export interface CustomRouteMeta {
    authorizedRoles?: string[];
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    meta?: CustomRouteMeta;
}
