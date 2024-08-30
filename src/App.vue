<template>
  <ErrorBoundary>
    <PageHeader />
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <LoadingView />
      </template>
    </Suspense>
    <PageFooter />
  </ErrorBoundary>
</template>

<script>
import PageFooter from "@/components/common/PageFooter";
import PageHeader from "@/components/common/PageHeader";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import LoadingView from "@/views/LoadingView";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter,
    ErrorBoundary,
    LoadingView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
