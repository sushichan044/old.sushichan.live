import MainContainer from '@/components/common/mainContainer'

export default async function imageLayout(props: { modal: React.ReactNode }) {
  return <MainContainer>{props.modal}</MainContainer>
}
