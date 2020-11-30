export function convertSnaps<T>(snaps: T[]) {
  return snaps.map((snap: T) => {
    return {
      id: snap['payload'].doc.id,
      ...snap['payload'].doc.data()
    };
  });
}
