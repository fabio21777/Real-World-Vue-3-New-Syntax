import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import { describe, expect, test,vi } from 'vitest'
import App from "./../../App.vue";

const mockPost = {
  userId: 1, //this is necessary for the API call
  id: 1,
  title: "Post 1",
  body: "Body 1",
};

describe("App", () => {
  test("user can create a new post", async () => {
    vi.spyOn(axios, "post").mockResolvedValueOnce({ data: mockPost });

    // mount the app
    const wrapper = mount(App);

    // fill in the input fields
    await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title);
    await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body);

    // submit the form
    await wrapper.find('[data-testid="post-form"]').trigger("submit");

    // assert that the submit button text changes
    expect(wrapper.find('[type="submit"]').html()).toContain("Creating...");

    await flushPromises();

    // assert that the created post is displayed
    expect(wrapper.html()).toContain(mockPost.title);
    expect(wrapper.html()).toContain(mockPost.body);
  });
  test('when creating creating a new post fails', async () => {
    vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Error occurred'))

    const wrapper = mount(App)

    await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
    await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)

    await wrapper.find('[data-testid="post-form"]').trigger('submit')

    expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

    await flushPromises()

    expect(wrapper.html()).toContain('Error occurred')
  });
});