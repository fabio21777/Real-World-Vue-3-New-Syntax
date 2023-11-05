import axios from 'axios'
import { mount,flushPromises } from '@vue/test-utils'
import { describe, expect, test,vi } from 'vitest'

import PostCard from '../PostCard.vue'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
}

describe('PostCard component', () => {
  test('deve renderizar o titulo do post carregado a partir do axios', async () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockPost })

    const wrapper = mount(PostCard)

    expect(wrapper.html()).toContain('Loading...')

    await flushPromises()

    //new
    expect(wrapper.find('[data-testid="post-title"]').text()).toBe(mockPost.title)

    expect(wrapper.find('[data-testid="post-body"]').text()).toBe(mockPost.body)
  })
  test('deve renderizar o estilos de erro caso o axios falhe', async () => {
    vi.spyOn(axios, 'get').mockRejectedValueOnce( new Error('Error') )
    const wrapper = mount(PostCard)
    expect(wrapper.html()).toContain('Loading...')
    await flushPromises()
    expect(wrapper.find('[data-testid="error-message"]').text()).toBe('Error')

  })
})
