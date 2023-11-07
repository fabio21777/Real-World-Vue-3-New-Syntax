# API de composição Vue 3

## objetos reativos

``` javaScript
const event = reactive({
          capacity: 4,
          attending: ["Tim", "Bob", "Joe"],
          spacesLeft: computed(() => {
            return event.capacity - event.attending.length;
          })
```

## Desestruturando

``` javaScript
setup() {
        const event = reactive({
          capacity: 4,
          attending: ["Tim", "Bob", "Joe"],
          spacesLeft: computed(() => {
            return event.capacity - event.attending.length;
          })
        });
        function increaseCapacity() {
          event.capacity++;
        }
        return { ...toRefs(event), increaseCapacity };
      }
```


```javaScript

	//use/event-space.js
    import { ref, computed } from "vue";

    export default function useEventSpace() {
      const capacity = ref(4);
      const attending = ref(["Tim", "Bob", "Joe"]);
      const spacesLeft = computed(() => {
        return capacity.value - attending.value.length;
      });
      function increaseCapacity() {
        capacity.value++;
      }
      return { capacity, attending, spacesLeft, increaseCapacity };
    }

	//usando o componente

	<template>
      ...
    </template>
    <script>
    import useEventSpace from "@/use/event-space";
    export default {
      setup() {
        return { ...useEventSpace(), ...useMapping() }
      }
    };
    </script>

```
## API LifeCycle Methods

![Alt text](<ciclo de vida.png>)

```javaScript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from "vue";

export default {
  setup() {
    onBeforeMount(() => {
      console.log("Before Mount!");
    });
    onMounted(() => {
      console.log("Mounted!");
    });
    onBeforeUpdate(() => {
      console.log("Before Update!");
    });
    onUpdated(() => {
      console.log("Updated!");
    });
    onBeforeUnmount(() => {
      console.log("Before Unmount!");
    });
    onUnmounted(() => {
      console.log("Unmounted!");
    });
    onActivated(() => {
      console.log("Activated!");
    });
    onDeactivated(() => {
      console.log("Deactivated!");
    });
    onErrorCaptured(() => {
      console.log("Error Captured!");
    });
  }
};
```

## Watch

```javaScript
watch(searchInput, () => {
  ...
});
watch(searchInput, (newVal, oldVal) => {
  ...
});
watch([firstName, lastName], () => {
  ...
});
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  ...
});

watchEffect(() => {
    results.value = eventApi.getEventCount(searchInput.value);
  });

```
![!\[Alt text\](image.png)](watch.png)

## Shared State
com esse padrão é possivel ter um gerenciado de chamadas globais em vez de um para cada chamadas

```javaScript
import { ref } from "@vue/composition-api";
export default function usePromise(fn) { // fn is the actual API call
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const createPromise = async (...args) => { // Args is where we send in searchInput
    loading.value = true;
    error.value = null;
    results.value = null;
    try {
      results.value = await fn(...args); // Passing through the SearchInput
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  return { results, loading, error, createPromise };
}

<template>
  <div>
    Search for <input v-model="searchInput" />
    <div>
      <p>Loading: {{ getEvents.loading }}</p>
      <p>Error: {{ getEvents.error }}</p>
      <p>Number of events: {{ getEvents.results }}</p>
    </div>
  </div>
</template>
<script>
...
export default {
  setup() {
    ...
    return { searchInput, getEvents };
  }
};
</script>
```

## Suspense
Usado para Skeleton Loading
```javaScript
<template>
  <div v-if="error">Uh oh .. {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import Event from "@/components/Event.vue";
import { ref, onErrorCaptured } from "vue";
export default {
  components: { Event },
  setup() {
    const error = ref(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });
    return { error };
  },
};
</script>
```
![Alt text](03-suspense.opt-1.gif)
