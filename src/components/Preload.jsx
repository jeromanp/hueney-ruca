export default function Preload(props) {
  return (
    <>
      {props.loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-6 border-b-6 border-brand-olive"></div>
        </div>
      ) : null}
    </>
  );
}
