<template>
  <div>
    <h1>Create an event</h1>
    <form>

      <BaseSelect
        label="select a category"
        v-model="event.category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>

      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
      />

      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
      />

      <h3>Are pets allowed?</h3>
      <BaseRadioGroup
        v-model="event.pets"
        :options="petOptions"
        name="pets"
        :vertical="true"

      />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox label="Catering" v-model="event.extras.catering" />
      </div>

      <div>
        <BaseCheckbox label="Music" v-model="event.extras.music" />
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<script>
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
export default {
  components: {
    BaseInput,
    BaseSelect
  },
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false
        }
      },
      petOptions: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    }
  }
}
</script>
