import { TabLayout } from "@/components/TabLayout";
import { SocialTab } from "@/components/social/SocialTab";
import { UpskillTab } from "@/components/upskill/UpskillTab";

const Index = () => {
  return <TabLayout socialContent={<SocialTab />} upskillContent={<UpskillTab />} />;
};

export default Index;