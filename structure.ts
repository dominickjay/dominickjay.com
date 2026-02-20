export const deskStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('Music Cache')
        .child(
          S.document()
            .schemaType('musicCache')
            .documentId('global-music-cache')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) =>
          item.getId() !== 'homepage' && item.getId() !== 'musicCache'
      ),
    ])
