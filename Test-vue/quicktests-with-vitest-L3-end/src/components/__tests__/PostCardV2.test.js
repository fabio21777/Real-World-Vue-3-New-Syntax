import { mount } from '@vue/test-utils'
import { describe, expect, test} from 'vitest'
import PostCardV2 from '../PostCardV2.vue'



describe('componente de card versão 2', () => {
    test('criar primeiro post', () => {
      const title = 'primeiro post'
      const body = 'conteudo do primeiro post'
      const wrapper = mount(PostCardV2, {
        props: { title, body }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })