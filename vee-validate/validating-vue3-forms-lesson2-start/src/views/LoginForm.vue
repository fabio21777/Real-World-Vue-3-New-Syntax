<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit="submit">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="category"
        :error="errors.category"
        :required="true"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        type="text"
        v-model="title"
        :error="errors.title"
        :required="true"
      />

      <BaseInput
        label="Description"
        type="text"
        v-model="description"
        :error="errors.description"
        :required="true"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        type="text"
        v-model="location"
        :error="errors.location"
      />

      <h3>Are pets allowed?</h3>
      <BaseRadioGroup
        name="pets"
        :options="[
          { value: 1, label: 'Yes' },
          { value: 0, label: 'No' }
        ]"
        v-model="pets"
        :error="errors.pets"
      />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox
          label="Catering"
          v-model="catering"
          :error="errors.catering"
        />
      </div>

      <div>
        <BaseCheckbox
          label="Live music"
          v-model="music"
          :error="errors.music"
        />
      </div>

      <div>
        <BaseButton
          type="submit"
          class="-fill-gradient"
          something="else"
        >
          Submit
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import { required, minLength, anything } from '@/validates/validateInputs'
export default {

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
      ]
    }
  },

  setup () {
    const validationSchema = {
      category: required,
      title: value => {
        const req = required(value)
        if (req !== true) return req
        const min = minLength(5, value)
        if (min !== true) return min
        return true
      },
      description: value => {
        const req = required(value)
        if (req !== true) return req
        const min = minLength(5, value)
        if (min !== true) return min
        return true
      },
      location: undefined,
      pets: anything,
      catering: anything,
      music: anything
    }

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {
        pets: 1,
        catering: false,
        music: false
      }
    })

    const submit = handleSubmit(values => {
      console.log('submit', values)
    })
    const { value: category } = useField('category')
    const { value: title } = useField('title')
    const { value: description } = useField('description')
    const { value: location } = useField('location')
    const { value: pets } = useField('pets')
    const { value: catering } = useField('catering')
    const { value: music } = useField('music')

    return {
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      submit,
      errors
    }
  }
}
</script>
