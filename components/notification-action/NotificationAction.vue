<template>
  <Alert>
    <Rocket class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
  import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
  import { Rocket } from 'lucide-vue-next'
</script>