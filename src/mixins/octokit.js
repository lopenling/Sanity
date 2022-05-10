import { Octokit } from "@octokit/rest";

const octokit = {
  data() {
    return {
      octokit: null,
    }
  },
  mounted() {
    this.octokit = new Octokit({
      auth: this.$store.state.authenticationToken,
      userAgent: "Cavai Sanity v0.1"
    });

    this.octokit.rateLimit.get().then(data => {
      if (data.data.resources.core.used > data.data.resources.core.limit) {
        this.error = {...this.error, show: true};
      } else {
        this.getInitialData();
      }
    });
  },
}

export default octokit;