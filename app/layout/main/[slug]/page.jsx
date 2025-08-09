
// Set the revalidation frequency for this page.
// revalidate = 0 means the page is never cached and will always be fresh.
export const revalidate = 0;

export default function MyPage({ params }) {
  
  return (
    <div>
        <h1>{ params.slug }</h1>
    </div>
  );
}
