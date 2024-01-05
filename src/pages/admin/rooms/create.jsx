import Layout from '../../../layouts/DashboardLayout'
import Header from '../../../components/dashboard/PageHeader'
import RoomForm from 'components/dashboard/form/RoomForm'

export default function Create()
{
	return (
		<Layout>
			<Header 
				title="Create cabaña"
				breadcrumbs={(<>
					<li>/</li>
					<li className="text-primary">Create cabaña</li>
				</>)}>
			</Header>

			<RoomForm />
		</Layout>
	)
}