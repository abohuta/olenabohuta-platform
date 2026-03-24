import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Стаття',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {
        list: [
          { title: 'Особистий бренд', value: 'brand' },
          { title: 'Християнство і віра', value: 'faith' },
          { title: 'Instagram та соцмережі', value: 'instagram' },
          { title: 'Мотивація та розвиток', value: 'motivation' },
          { title: 'Кейси учнів', value: 'cases' },
          { title: 'SMM', value: 'smm' },
          { title: 'Мислення', value: 'mindset' },
          { title: 'Фінанси', value: 'finance' },
          { title: 'Книги', value: 'books' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Головне фото',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Текст статті',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Підпис',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Головна стаття',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readTime',
      title: 'Час читання (хв)',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'category',
    },
  },
})