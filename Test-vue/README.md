# Repositorio com os conceitos de testes com vue

## Dica

Sempre que possível, comece do caso mais simples para o mais complexo.

## Passos para Testes Unitários

1. Crie um conjunto de testes `describe(...)`
2. Configure seus testes `test(...)`
3. Monte o componente com vue-test-utils `mount(...)`
4. Defina dados, se necessário `setData(...)` Usando async / await
5. Afirme o que o resultado deve ser `expect(...)` ao esperar atualizações do DOM

```javascript
describe('AppHeader', () => {
  test('Se o usuário está logado, mostrar o botão de logout', async () => {
    const wrapper = mount(AppHeader)
    wrapper.setData({ loggedIn: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').isVisible()).toBe(false)
  })
})
```

## Testando com interatividade

1 - vocẽ irá usar o `mount`, para realizar mudanças de estados e propriedades
2 - as operações com dom devem ser `async`
3 - o framework de teste svai ter diretimas para facilitar assert e busca de elementos no componente

```javascript
test('Se o botão for clicado, o randomNumber deve ser entre 200 e 300', async () => {
  const wrapper = mount(RandomNumber, {
    props: {
      min: 200,
      max: 300
    }
  })

  await wrapper.find('button').trigger('click')
  const randomNumber = parseInt(wrapper.find('span').text())

  expect(randomNumber).toBeGreaterThanOrEqual(200)
  expect(randomNumber).toBeLessThanOrEqual(300)
})
```

## testando emição de eventos

1. Encontrar o campo de entrada de texto
2. Definir valor para o campo de entrada de texto
3. Simular o envio do formulário
4. Verificar se o evento foi emitido
5. Confirmar se o conteúdo do evento está correto

```javaScript
import LoginForm from '@/components/LoginForm.vue'
import { mount } from '@vue/test-utils'

describe('LoginForm', () => {
  it('emits an event with a user data payload', () => {
    const wrapper = mount(LoginForm)
    // 1. Find text input
    // 2. Set value for text input
    // 3. Simulate form submission
    // 4. Assert event has been emitted
    // 5. Assert payload is correct
  })
})

//resultado final

describe('LoginForm', () => {
  it('emits an event with user data payload', () => {
    const wrapper = mount(LoginForm)
    const input = wrapper.find('input[type="text"]') // Find text input

    input.setValue('Adam Jahr') // Set value for text input
    wrapper.trigger('submit') // Simulate form submission

    // Assert event has been emitted
    const formSubmittedCalls = wrapper.emitted('formSubmitted')
    expect(formSubmittedCalls).toHaveLength(1)

    // Assert payload is correct
    const expectedPayload = { name: 'Adam Jahr' }
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(expectedPayload)
  })
})

```

## Testando chamadas a API

1 - Simular a chamada à API
2 - Aguardar a resolução da promessa
3 - Verificar que a chamada ocorreu uma vez
4 - Verificar que o componente exibe a mensagem

```javaScript
jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
    const mockMessage = 'Hello from the db'
    getMessage.mockResolvedValueOnce({ text: mockMessage })
    const wrapper = mount(MessageDisplay)

    await flushPromises()
    expect(getMessage).toHaveBeenCalledTimes(1)

    const message = wrapper.find('[data-testid="message"]').text()
    expect(message).toEqual(mockMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong.'
    getMessage.mockRejectedValueOnce(mockError)
    const wrapper = mount(MessageDisplay)

    await flushPromises()
    expect(getMessage).toHaveBeenCalledTimes(1)
    const displayedError = wrapper.find('[data-testid="message-error"]').text()
    expect(displayedError).toEqual(mockError)
  })
})
```
