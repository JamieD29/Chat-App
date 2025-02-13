import { createAuthSlice } from "./slices/auth-slice";
import { create } from 'zustand';
export const userAppStore = create()((...a)=>({
    ...createAuthSlice(...a),
}))