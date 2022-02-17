<template>
  <div>
    {{error}}
  </div>
</template>

<script>
//import DefaultLayout from '~/modules/ui/layouts/test'
// import {
//     defaultLayoutMiddleware,
// } from '@Core/middleware/layout';
export default {
	name: 'NuxtDefaultError',
	props: {
		/**
		 * Validation error
		 */
		error: {
			type: [
				Object,
				Error,
			],
			required: true,
		},
	},
	components: {
		// DefaultLayout,
	},
	// async middleware(ctx) {
	//     await defaultLayoutMiddleware(ctx);
	// },
};
</script>