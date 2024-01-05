import Layout from '../../../layouts/DashboardLayout'
import Header from '../../../components/dashboard/PageHeader'
import RoomForm from 'components/dashboard/form/RoomForm'
import { supabase } from 'utils/supabase'

export default function Edit({ room }) {
	return (
		<Layout>
			<Header
				title="Edit cabaña"
				breadcrumbs={(<>
					<li>/</li>
					<li className="text-primary">Edit cabaña</li>
				</>)}>
			</Header>

			<RoomForm room={room} />
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { id } = params;
  
	const { data: room, error } = await supabase
		.from("rooms")
		.select("*")
		.eq("id", id);
  
	if (error) {
		return {
			notFound: true,
		};
	}
  
	return {
		props: {
			room: room[0],
		},
	};
}