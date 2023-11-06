import { mount } from '@vue/test-utils'
import NotificationToast from '../NotificationToast.vue'
import { describe, expect, test } from 'vitest'

describe('Notification component', () => {
  test('deve ser rederizado o estilos do tipo erro'),
    () => {
      const status = 'error'
      const wrapper = mount(NotificationToast, {
        props: { status }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--error']))
    }

  test('deve ser rederizado o estilos do tipo sucesso'),
    () => {
      const status = 'success'
      const wrapper = mount(NotificationToast, {
        props: { status }
      })
      expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--success']))
    }

  test('deve ser rederizado o estilos do tipo info'),
    () => {
      const status = 'info'
      const wrapper = mount(NotificationToast, {
        props: { status }
      })
      expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--info']))
    }

  test('deve ser ser rederizado o texto de aviso caso a menssaem seja vazia'),
    () => {
      const message = ''
      const wrapper = mount(NotificationToast, {
        props: { message }
      })
      expect(wrapper.classes('notification--slide')).toBe(false)
    }
  test('Deve ser possivel limpa a notificação', async () => {
    const wrapper = mount(NotificationToast)
    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clear-notification')
  })

  // test('deve exibir a mensagem corretamente', () => {
  //   const message = 'Something happened, try again'
  //   const wrapper = mount(NotificationToast, {
  //     props: { message }
  //   })
  //   expect(wrapper.find('p').text()).toBe(message)
  // })
})
