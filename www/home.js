/* globals  Vue */
Vue.createApp({
  data() {
    return {
      roomId: "",
    };
  },
  methods: {
    generateRandomRoomId() {
      this.roomId = Math.random().toString(36).substr(2, 6);
    },
    goToRoom() {
      if (this.roomId.toLowerCase() === "signup") {
        window.location = "/signUP";
      } else {
        window.location = "/" + this.roomId;
      }
    },
  },
}).mount("#app");
