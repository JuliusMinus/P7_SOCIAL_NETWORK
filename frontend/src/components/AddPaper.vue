

<template>
  <div>
    <form @submit="(e) => e.preventDefault()" class="newpaper">
      <label class="titlePaper"><a>Contenu de la publication</a></label>
      <textarea
        class="form-control"
        v-model="paperContent"
        id="papercontent"
        type="text"
        placeholder="Que voulez vous partager?"
      />
      <label class="download"><a>Télécharger votre publication</a></label>
      <input
        class="form-control"
        name="file"
        type="file"
        id="file"
        @change="handleFileUpload"
      />
    </form>
    <button
      id="btnSend"
      class="btn btn-success"
      type="submit"
      @click="sendNewPaper()"
    >
      Mettez votre publication en ligne
    </button>
  </div>
</template>

<script>
export default {
  name: "AddPaper",
  data() {
    return {
      paperContent: "",
      file: "",
    };
  },
  methods: {
    sendNewPaper() {
      console.log(this.paperContent);
      console.log(this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("content", this.paperContent);
      formData.append("userID", sessionStorage.getItem("userId"));

      fetch(`http://localhost:3000/api/papers/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ` + sessionStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res);
        if (res.status === 201) {
          window.location.href = "#/Forum";
        }
      });
    },

    handleFileUpload(event) {
      console.log(event.target.files);
      this.file = event.target.files[0];
    },
    disconnect() {
      sessionStorage.removeItem("user");
      location.href = "/";
    },
  },
};
</script>

<style scoped>
#papercontent {
  border-width: 2px;
  height: 70px;
  box-shadow: 0px 0px 10px 5px #8e92a1;
  margin-bottom: 15px;
  }

 


#file {
  display: flex;
  border-width: 2px;
  height: 50px;
  box-shadow: 0px 0px 10px 5px #8e92a1;
}
#btnSend {
  margin-top: 50px;
}
.form-control {
  height: 50px;
}
</style>


