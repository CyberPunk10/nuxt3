<template>
  <div class="tweet-item__header p-4 flex">
    <div>
      <img
        :src="author.profileImage"
        :alt="author.profileImage"
        class="w-10 h-10 rounded-full"
      >
    </div>
    <div class="ml-3">
      <span class="text-gray-500 text-sm mr-1">
        #{{ props.tweet.id }}
      </span>
      <span class="font-medium text-gray-800 dark:text-white">
        {{ author.name }}
      </span>
      <span class="ml-3 text-sm font-medium text-gray-400">
        <nuxt-link to="#">
          {{ author.handle }}
        </nuxt-link>
        . {{ props.tweet.postedAtHuman }}
      </span>

      <p v-if="props.tweet.replyTo" class="text-sm">
        <span class="text-gray-500">
          Replying to
        </span>

        <nuxt-link
          :to="replyToTweetUrl"
          class="text-blue-400"
        >
          {{ props.tweet.replyTo.author.handle }}
        </nuxt-link>

        <span class="text-gray-500">
          #{{ props.tweet.replyTo.id }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  }
})

const author = props.tweet.author;

const replyToTweetUrl = computed(() => `/twitter/status/${props.tweet?.replyTo?.id}`)

</script>