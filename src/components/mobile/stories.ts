import type {Pair} from '../portfolio/content';
export type StoryKind='rental'|'elements'|'studio'|'research'|'learning';
export type StoryStep={label:Pair;title:Pair;description:Pair;rows:Pair[]};
export const stories:Record<StoryKind,{name:Pair;note:Pair;steps:StoryStep[]}>= {
 rental:{name:['Rental explorer','租房探索'],note:['Fictional listing · Schematic map','虚构房源 · 示意地图'],steps:[
 {label:['Discover','发现'],title:['Start with the neighborhood.','从区域开始。'],description:['Locate a sample apartment in Jersey City.','定位泽西市的一处示例公寓。'],rows:[['Jersey City','泽西市'],['NYC / NJ','纽约 / 新泽西']]},
 {label:['Compare','比较'],title:['See the practical details.','看清实际条件。'],description:['Compare price and amenities before saving a candidate.','保存候选房源前，比较租金与设施。'],rows:[['$3,200 / month','每月 $3,200'],['1 bed · In-unit laundry','一居室 · 室内洗衣机']]},
 {label:['Shortlist','候选'],title:['Keep a considered option.','保留经过比较的选择。'],description:['Save this sample locally. No enquiry is sent.','在当前页面保存示例，不发送咨询。'],rows:[['Sample 01','示例 01'],['Jersey City · $3,200','泽西市 · $3,200']]}]},
 elements:{name:['Elementization','Elementization'],note:['Conceptual visual · Private method omitted','概念示意 · 不展示私有方法'],steps:[
 {label:['Records','记录'],title:['Begin with structured records.','从结构化记录开始。'],description:['Records remain inside an organization boundary.','记录处于组织边界之内。'],rows:[['Structured input','结构化输入'],['Declared task','声明的任务']]},
 {label:['Transform','变换'],title:['Change the substrate.','改变数据载体。'],description:['A private transformation produces computational elements.','私有变换产生计算元素。'],rows:[['Opaque boundary','不透明边界'],['Internal method omitted','内部方法不公开']]},
 {label:['Explore','探索'],title:['Work within a declared scope.','在声明范围内计算。'],description:['Explore conceptual grouping. Positions are illustrative.','探索概念分组，位置仅为示意。'],rows:[['Task-specific capabilities','针对特定任务的能力'],['Separate utility and privacy evaluation','效用与隐私分别评估']]}]},
 studio:{name:['Innerfy / Studio','Innerfy / Studio'],note:['Sanitized workflow · No private engine runs','经过简化的流程 · 不运行私有引擎'],steps:[
 {label:['Intake','导入'],title:['Begin with structure.','从结构开始。'],description:['Inspect the source before choosing how to proceed.','决定下一步前检查来源。'],rows:[['Structured table','结构化表格'],['Local workspace','本地工作区']]},
 {label:['Review','检查'],title:['Understand the source.','理解来源。'],description:['Review field roles and sensitivity.','检查字段角色与敏感性。'],rows:[['Schema and field roles','模式与字段角色'],['Human sensitivity review','人工敏感性检查']]},
 {label:['Validation','验证'],title:['Evidence before approval.','先有证据，再审批。'],description:['Read each evaluation axis in its own context.','在各自上下文中理解评估维度。'],rows:[['Structural preservation','结构保持'],['Reconstruction resistance','重建抵抗'],['Linkage resistance','关联抵抗']]},
 {label:['Approval','审批'],title:['Make the decision explicit.','明确作出决定。'],description:['A person reviews evidence and the declared capabilities.','由人审阅证据与声明能力。'],rows:[['Evidence reviewed','审阅证据'],['Capability scope reviewed','审阅能力范围']]},
 {label:['Output','输出'],title:['Inspect governed artifacts.','检查受治理的产物。'],description:['Explore the output and its declared interface.','了解输出及其声明接口。'],rows:[['Computational elements','计算元素'],['Declared contract','声明的契约']]}]},
 research:{name:['ALOA / Two-tower models','ALOA / 双塔模型'],note:['Conceptual geometry · See paper for measured results','概念几何 · 实测结果请参阅论文'],steps:[
 {label:['Towers','双塔'],title:['Two inputs. Two embeddings.','两个输入，两组嵌入。'],description:['User and item towers encode their respective inputs.','用户塔与物品塔分别编码各自的输入。'],rows:[['User input','用户输入'],['Item input','物品输入']]},
 {label:['Perturb','扰动'],title:['Change a user feature.','改变一个用户特征。'],description:['Watch the input reach the tower before its response changes.','观察输入先到达用户塔，再产生响应变化。'],rows:[['User-feature perturbation','用户特征扰动'],['Response behavior','响应行为']]},
 {label:['Evidence','证据'],title:['Ask about training membership.','询问训练成员身份。'],description:['The full method uses a shadow model and membership classifier.','完整方法使用影子模型与成员分类器。'],rows:[['Membership is not reconstruction','成员推断不是记录重建'],['MMD is not a membership probability','MMD 不是成员概率']]}]},
 learning:{name:['AI Learning Assistant','AI 学习助手'],note:['System design · No live student records','系统设计 · 未连接学生记录'],steps:[
 {label:['Observe','观察'],title:['Turn activity into learning signals.','将活动转为学习信号。'],description:['Privacy processing separates sensitive data from AI decisions.','隐私处理将敏感数据与 AI 决策分离。'],rows:[['Quiz attempts','测验尝试'],['Time on task','任务用时'],['Module completion','模块完成']]},
 {label:['Adapt','适应'],title:['One profile guides instruction.','用学习画像指导教学。'],description:['Adjust reinforcement, knowledge intensity, and teaching actions.','调整巩固频率、知识密度与教学行动。'],rows:[['Learning pace · Handling stability','学习速度 · 应对稳定性'],['Mastery · Load capacity · Risk','掌握程度 · 负荷容量 · 风险']]},
 {label:['Recalibrate','校准'],title:['Each interaction informs the next.','每次互动影响下一次教学。'],description:['New signals update the profile and inform instructor insights.','新信号更新学习画像，并提供教师洞察。'],rows:[['Retention and repeated confusion','记忆保持与反复困惑'],['Forecasts · Gaps · Risk alerts','预测 · 薄弱点 · 风险提醒']]}]}
};
