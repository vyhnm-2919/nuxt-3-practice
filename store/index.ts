import { ToastStateDTO } from "~~/models/store/toast";

export const state = () => ({
  content: "",
  state: "",
});

export const mutations = {
  showToast(state: ToastStateDTO, payload: ToastStateDTO) {
    state.content = payload.content;
    state.state = payload.state;
  },
};
